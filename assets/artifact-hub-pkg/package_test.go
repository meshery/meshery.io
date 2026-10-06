package main

import (
	"errors"
	"net/http"
	"os"
	"os/exec"
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
