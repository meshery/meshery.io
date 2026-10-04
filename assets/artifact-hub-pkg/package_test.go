package main

import (
	"errors"
	"strings"
	"testing"

	designv1beta3 "github.com/meshery/schemas/models/v1beta3/design"
)

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
