package main

import (
	"errors"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"

	designv1beta3 "github.com/meshery/schemas/models/v1beta3/design"
)

type roundTripFunc func(*http.Request) (*http.Response, error)

func (f roundTripFunc) RoundTrip(request *http.Request) (*http.Response, error) {
	return f(request)
}

// TestRunCatalogGenerationFetchFailure verifies fetch errors are returned.
func TestRunCatalogGenerationFetchFailure(t *testing.T) {
	wantErr := errors.New("catalog service unavailable")
	err := runCatalogGeneration(
		func() (*designv1beta3.CatalogContentPage, error) {
			return nil, wantErr
		},
		func(designv1beta3.MesheryPattern, string) error {
			t.Fatal("pattern processor called after fetch failure")
			return nil
		},
		"token",
	)

	if !errors.Is(err, wantErr) {
		t.Fatalf("runCatalogGeneration() error = %v, want %v", err, wantErr)
	}
}

// TestMainExitsNonZeroOnCatalogGenerationFailure verifies the CLI exit status.
func TestMainExitsNonZeroOnCatalogGenerationFailure(t *testing.T) {
	const helperEnv = "MESHERY_CATALOG_MAIN_HELPER"
	if os.Getenv(helperEnv) == "1" {
		http.DefaultTransport = roundTripFunc(func(*http.Request) (*http.Response, error) {
			return nil, errors.New("forced catalog fetch failure")
		})
		main()
		return
	}

	command := exec.Command(os.Args[0], "-test.run=^TestMainExitsNonZeroOnCatalogGenerationFailure$")
	command.Env = append(os.Environ(), helperEnv+"=1")
	output, err := command.CombinedOutput()
	if err == nil {
		t.Fatalf("CLI exited successfully after catalog fetch failure; output: %s", output)
	}
	exitError, ok := err.(*exec.ExitError)
	if !ok {
		t.Fatalf("CLI error = %v, want process exit code 1; output: %s", err, output)
	}
	if exitError.ExitCode() != 1 {
		t.Fatalf("CLI exit code = %d, want 1; output: %s", exitError.ExitCode(), output)
	}
	if !strings.Contains(string(output), "forced catalog fetch failure") {
		t.Fatalf("CLI output = %q, want evidence of forced catalog fetch failure", output)
	}
}

// TestRunCatalogGenerationMissingPatterns verifies missing patterns are rejected.
func TestRunCatalogGenerationMissingPatterns(t *testing.T) {
	err := runCatalogGeneration(
		func() (*designv1beta3.CatalogContentPage, error) {
			return &designv1beta3.CatalogContentPage{}, nil
		},
		func(designv1beta3.MesheryPattern, string) error {
			t.Fatal("pattern processor called with missing patterns")
			return nil
		},
		"token",
	)

	if err == nil || !strings.Contains(err.Error(), "missing required patterns field") {
		t.Fatalf("runCatalogGeneration() error = %v, want missing patterns field error", err)
	}
}

// TestRunCatalogGenerationPatternFailure verifies processing errors stop generation.
func TestRunCatalogGenerationPatternFailure(t *testing.T) {
	patterns := []designv1beta3.MesheryPattern{{}, {}, {}}
	page := &designv1beta3.CatalogContentPage{Patterns: &patterns}
	processed := 0
	err := runCatalogGeneration(
		func() (*designv1beta3.CatalogContentPage, error) {
			return page, nil
		},
		func(designv1beta3.MesheryPattern, string) error {
			processed++
			if processed == 2 {
				return errors.New("pattern processing failed")
			}
			return nil
		},
		"token",
	)

	if err == nil {
		t.Fatal("runCatalogGeneration() error = nil, want pattern processing error")
	}
	if !strings.Contains(err.Error(), "unable to process catalog pattern") {
		t.Fatalf("runCatalogGeneration() error = %q, want pattern context", err)
	}
	if processed != 2 {
		t.Fatalf("processed %d patterns, want stop at failed second pattern", processed)
	}
}

// TestRunCatalogGenerationSuccess verifies all patterns process successfully.
func TestRunCatalogGenerationSuccess(t *testing.T) {
	patterns := []designv1beta3.MesheryPattern{{}, {}}
	page := &designv1beta3.CatalogContentPage{Patterns: &patterns}
	processed := 0
	err := runCatalogGeneration(
		func() (*designv1beta3.CatalogContentPage, error) {
			return page, nil
		},
		func(_ designv1beta3.MesheryPattern, token string) error {
			processed++
			if token != "token" {
				t.Fatalf("processor token = %q, want token", token)
			}
			return nil
		},
		"token",
	)

	if err != nil {
		t.Fatalf("runCatalogGeneration() error = %v, want nil", err)
	}
	if processed != len(patterns) {
		t.Fatalf("processed %d patterns, want %d", processed, len(patterns))
	}
}

// TestRunCatalogGenerationEmptyPatterns verifies an explicit empty list is valid.
func TestRunCatalogGenerationEmptyPatterns(t *testing.T) {
	patterns := []designv1beta3.MesheryPattern{}
	page := &designv1beta3.CatalogContentPage{Patterns: &patterns}
	processed := false
	err := runCatalogGeneration(
		func() (*designv1beta3.CatalogContentPage, error) {
			return page, nil
		},
		func(designv1beta3.MesheryPattern, string) error {
			processed = true
			return nil
		},
		"token",
	)

	if err != nil {
		t.Fatalf("runCatalogGeneration() error = %v, want nil", err)
	}
	if processed {
		t.Fatal("pattern processor called for an empty patterns list")
	}
}

// TestRunCatalogGenerationNilPage verifies (nil, nil) from fetch is safely rejected.
func TestRunCatalogGenerationNilPage(t *testing.T) {
	err := runCatalogGeneration(
		func() (*designv1beta3.CatalogContentPage, error) {
			return nil, nil
		},
		func(designv1beta3.MesheryPattern, string) error {
			t.Fatal("pattern processor called with nil page")
			return nil
		},
		"token",
	)

	if err == nil || !strings.Contains(err.Error(), "missing required patterns field") {
		t.Fatalf("runCatalogGeneration() error = %v, want missing patterns field error", err)
	}
}

// TestInvokeGitHubAction verifies status code handling and error reporting.
func TestInvokeGitHubAction(t *testing.T) {
	tests := []struct {
		name       string
		statusCode int
		status     string
		respBody   string
		wantErr    bool
		errSubstr  string
	}{
		{
			name:       "success 204 No Content",
			statusCode: http.StatusNoContent,
			status:     "204 No Content",
			wantErr:    false,
		},
		{
			name:       "success 200 OK",
			statusCode: http.StatusOK,
			status:     "200 OK",
			wantErr:    false,
		},
		{
			name:       "unauthorized 401",
			statusCode: http.StatusUnauthorized,
			status:     "401 Unauthorized",
			respBody:   `{"message":"Bad credentials"}`,
			wantErr:    true,
			errSubstr:  "401 Unauthorized",
		},
		{
			name:       "not found 404",
			statusCode: http.StatusNotFound,
			status:     "404 Not Found",
			respBody:   `{"message":"Not Found"}`,
			wantErr:    true,
			errSubstr:  "404 Not Found",
		},
		{
			name:       "server error 500",
			statusCode: http.StatusInternalServerError,
			status:     "500 Internal Server Error",
			wantErr:    true,
			errSubstr:  "500 Internal Server Error",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			origTransport := http.DefaultTransport
			defer func() { http.DefaultTransport = origTransport }()

			http.DefaultTransport = roundTripFunc(func(req *http.Request) (*http.Response, error) {
				return &http.Response{
					StatusCode: tc.statusCode,
					Status:     tc.status,
					Body:       io.NopCloser(strings.NewReader(tc.respBody)),
					Header:     make(http.Header),
				}, nil
			})

			err := invokeGitHubAction("test-content-id", "test-asset-location", "test-token")
			if tc.wantErr {
				if err == nil {
					t.Fatalf("invokeGitHubAction() error = nil, want error containing %q", tc.errSubstr)
				}
				if !strings.Contains(err.Error(), tc.errSubstr) {
					t.Fatalf("invokeGitHubAction() error = %q, want error containing %q", err.Error(), tc.errSubstr)
				}
			} else {
				if err != nil {
					t.Fatalf("invokeGitHubAction() unexpected error: %v", err)
				}
			}
		})
	}
}

// TestRunCatalogGenerationDispatchFailure verifies workflow dispatch failures propagate through runCatalogGeneration.
func TestRunCatalogGenerationDispatchFailure(t *testing.T) {
	origTransport := http.DefaultTransport
	defer func() { http.DefaultTransport = origTransport }()

	http.DefaultTransport = roundTripFunc(func(req *http.Request) (*http.Response, error) {
		return &http.Response{
			StatusCode: http.StatusNotFound,
			Status:     "404 Not Found",
			Body:       io.NopCloser(strings.NewReader(`{"message":"Workflow not found"}`)),
			Header:     make(http.Header),
		}, nil
	})

	patterns := []designv1beta3.MesheryPattern{{}}
	page := &designv1beta3.CatalogContentPage{Patterns: &patterns}

	err := runCatalogGeneration(
		func() (*designv1beta3.CatalogContentPage, error) {
			return page, nil
		},
		func(pattern designv1beta3.MesheryPattern, token string) error {
			return invokeGitHubAction(pattern.ID.String(), "test-asset-location", token)
		},
		"test-token",
	)

	if err == nil {
		t.Fatal("runCatalogGeneration() error = nil, want workflow dispatch failure")
	}
	if !strings.Contains(err.Error(), "unable to process catalog pattern") {
		t.Fatalf("runCatalogGeneration() error = %q, want pattern processing error context", err.Error())
	}
	if !strings.Contains(err.Error(), "404 Not Found") {
		t.Fatalf("runCatalogGeneration() error = %q, want dispatch status code context", err.Error())
	}
}

// TestMainExitsNonZeroOnDispatchFailure verifies CLI exits non-zero when workflow dispatch fails.
func TestMainExitsNonZeroOnDispatchFailure(t *testing.T) {
	const helperEnv = "MESHERY_CATALOG_DISPATCH_MAIN_HELPER"
	if os.Getenv(helperEnv) == "1" {
		http.DefaultTransport = roundTripFunc(func(request *http.Request) (*http.Response, error) {
			if strings.Contains(request.URL.Host, "cloud.meshery.io") {
				catalogJSON := `{"patterns":[{"id":"00000000-0000-0000-0000-000000000001","name":"test-pattern"}]}`
				return &http.Response{
					StatusCode: http.StatusOK,
					Status:     "200 OK",
					Body:       io.NopCloser(strings.NewReader(catalogJSON)),
					Header:     make(http.Header),
				}, nil
			}
			if strings.Contains(request.URL.Host, "api.github.com") {
				return &http.Response{
					StatusCode: http.StatusUnauthorized,
					Status:     "401 Unauthorized",
					Body:       io.NopCloser(strings.NewReader(`{"message":"Bad credentials"}`)),
					Header:     make(http.Header),
				}, nil
			}
			return nil, errors.New("unhandled request in test transport")
		})
		main()
		return
	}

	tempDir := t.TempDir()
	pkgDir := filepath.Join(tempDir, "assets", "artifact-hub-pkg")
	if err := os.MkdirAll(pkgDir, 0755); err != nil {
		t.Fatalf("failed to create temp test directory: %v", err)
	}

	command := exec.Command(os.Args[0], "-test.run=^TestMainExitsNonZeroOnDispatchFailure$")
	command.Dir = pkgDir
	command.Env = append(os.Environ(), helperEnv+"=1", "GH_ACCESS_TOKEN=test-token")
	output, err := command.CombinedOutput()
	if err == nil {
		t.Fatalf("CLI exited successfully after workflow dispatch failure; output: %s", output)
	}
	exitError, ok := err.(*exec.ExitError)
	if !ok {
		t.Fatalf("CLI error = %v, want process exit code 1; output: %s", err, output)
	}
	if exitError.ExitCode() != 1 {
		t.Fatalf("CLI exit code = %d, want 1; output: %s", exitError.ExitCode(), output)
	}
	if !strings.Contains(string(output), "401 Unauthorized") {
		t.Fatalf("CLI output = %q, want evidence of dispatch failure (401 Unauthorized)", output)
	}
}

