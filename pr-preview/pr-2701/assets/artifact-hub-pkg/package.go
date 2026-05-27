package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/Masterminds/semver/v3"
	"gopkg.in/yaml.v3"

	meshkitErrors "github.com/meshery/meshkit/errors"
	"github.com/meshery/meshkit/logger"
	"github.com/meshery/meshkit/utils"

	catalogv1alpha1 "github.com/meshery/meshkit/models/catalog/v1alpha1"
	"github.com/meshery/meshkit/utils/catalog"

	catalogv1alpha2 "github.com/meshery/schemas/models/v1alpha2/catalog"
	userv1beta2 "github.com/meshery/schemas/models/v1beta2/user"
	designv1beta3 "github.com/meshery/schemas/models/v1beta3/design"
)

const (
	mesheryCloudBaseURL    = "https://cloud.layer5.io"
	mesheryCatalogFilesDir = "catalog"
)

var (
	ErrProcessPatternCode      = "test_code"
	ErrHTTPGetRequestCode      = "test_code"
	ErrCreateGitHubRequestCode = "test_code"
	ErrInvokeGitHubActionsCode = "test_code"
	ErrCreateVersionDirCode    = "test_code"
	ErrDecodingContentCode     = "test_code"
)

func main() {
	token := os.Getenv("GH_ACCESS_TOKEN")
	log, err := logger.New("mesheryio_package", logger.Options{
		Format:   logger.SyslogLogFormat,
		LogLevel: 5,
	})
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	page, err := fetchCatalogPatterns()
	if err != nil {
		log.Error(err)
		return
	}
	if page.Patterns == nil {
		return
	}

	for _, pattern := range *page.Patterns {
		if err := processPattern(pattern, token); err != nil {
			log.Error(meshkitErrors.New(ErrProcessPatternCode, meshkitErrors.Alert,
				[]string{"unable to process catalog pattern"},
				[]string{err.Error()},
				[]string{"fail to read/write file", "error regarding user info"},
				[]string{"check the catalog pattern file", "check for updated files"},
			))
		}
	}
}

func slugify(name string) string {
	s := strings.ToLower(name)
	s = regexp.MustCompile("[^a-z0-9]+").ReplaceAllString(s, "-")
	return strings.Trim(s, "-")
}

func fetchCatalogPatterns() (*designv1beta3.CatalogContentPage, error) {
	endpoint := fmt.Sprintf("%s/api/catalog/content/pattern?populate=pattern_file", mesheryCloudBaseURL)
	resp, err := http.Get(endpoint)
	if err != nil {
		return nil, ErrHTTPGetRequest(err, endpoint)
	}
	defer resp.Body.Close()

	var page designv1beta3.CatalogContentPage
	if err := json.NewDecoder(resp.Body).Decode(&page); err != nil {
		return nil, utils.ErrUnmarshal(err)
	}
	return &page, nil
}

func processPattern(pattern designv1beta3.MesheryPattern, token string) error {
	patternID := pattern.ID.String()
	patternImageURL := getPatternImageURL(pattern)
	patternType := getPatternType(catalogTypeOf(pattern.CatalogData))
	patternInfo := getStringOrEmpty(catalogPatternInfo(pattern.CatalogData))
	patternCaveats := getStringOrEmpty(catalogPatternCaveats(pattern.CatalogData))
	compatibility := getCompatibility(catalogCompatibility(pattern.CatalogData))

	dir := filepath.Join("..", "..", "collections", "_catalog", patternType)
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return ErrCreatingVersionDir(err)
		}
	}

	version := catalogPublishedVersion(pattern.CatalogData)
	if version == "" {
		version = semver.New(0, 0, 1, "", "").String()
	}

	versionDir := filepath.Join("..", "..", mesheryCatalogFilesDir, patternID, version)
	if _, err := os.Stat(versionDir); os.IsNotExist(err) {
		if err := os.MkdirAll(versionDir, 0755); err != nil {
			return ErrCreatingVersionDir(err)
		}
	}

	if err := writePatternFile(pattern, versionDir, patternType, patternInfo, patternCaveats, compatibility, patternImageURL); err != nil {
		return err
	}
	return invokeGitHubAction(patternID, patternImageURL, token)
}

func getPatternImageURL(pattern designv1beta3.MesheryPattern) string {
	patternID := pattern.ID.String()
	defaultURL := fmt.Sprintf("https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/design-assets/%s-light.png,https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/design-assets/%s-dark.png", patternID, patternID)

	if pattern.CatalogData == nil || pattern.CatalogData.SnapshotURL == nil {
		return defaultURL
	}
	urls := *pattern.CatalogData.SnapshotURL
	switch len(urls) {
	case 0:
		return defaultURL
	case 1:
		return urls[0]
	default:
		return strings.Join(urls, ",")
	}
}

func getPatternType(patternType string) string {
	if patternType == "" {
		patternType = "Deployment"
	}
	return strings.ToLower(strings.ReplaceAll(patternType, " ", "-"))
}

func getStringOrEmpty(value string) string {
	if value == "" {
		return "\"\""
	}
	return value
}

func getCompatibility(compatibility []string) string {
	lines := make([]string, 0, len(compatibility))
	for _, c := range compatibility {
		lines = append(lines, fmt.Sprintf("    - %s", c))
	}
	return strings.Join(lines, "\n")
}

func decodeURIComponent(encodedURI string) (string, error) {
	return url.QueryUnescape(encodedURI)
}

func writePatternFile(pattern designv1beta3.MesheryPattern, versionDir, patternType, patternInfo, patternCaveats, compatibility, patternImageURL string) error {
	patternID := pattern.ID.String()
	patternName := string(pattern.Name)

	designFilePath := filepath.Join(versionDir, "design.yml")
	patternFileBody := ""
	if pattern.PatternFile != nil {
		patternFileBody = *pattern.PatternFile
	}
	if err := os.WriteFile(designFilePath, []byte(patternFileBody), 0644); err != nil {
		return utils.ErrWriteFile(err, designFilePath)
	}

	contenttemp, err := os.ReadFile(designFilePath)
	if err != nil {
		return utils.ErrReadFile(err, designFilePath)
	}

	var datatemp map[string]interface{}
	if err := yaml.Unmarshal(contenttemp, &datatemp); err != nil {
		utils.ErrUnmarshal(err)
	}

	if services, ok := datatemp["services"]; !ok || services == nil {
		patternImageURL = "/assets/images/logos/service-mesh-pattern.svg"
	}

	// Stable Unix-epoch sentinel when the API omits createdAt so the generated
	// artifacthub-pkg.yml stays byte-identical across runs and doesn't churn
	// the catalog with no-op commits.
	createdAt := time.Unix(0, 0).UTC()
	if !pattern.CreatedAt.IsZero() {
		createdAt = pattern.CreatedAt
	}

	infoForPkg := catalogPatternInfo(pattern.CatalogData)
	if infoForPkg == "" {
		infoForPkg = patternName
	}
	infoForPkg, err = decodeURIComponent(infoForPkg)
	if err != nil {
		return ErrDecodingContent(err)
	}
	caveatsForPkg, err := decodeURIComponent(catalogPatternCaveats(pattern.CatalogData))
	if err != nil {
		return ErrDecodingContent(err)
	}

	version := catalogPublishedVersion(pattern.CatalogData)
	if version == "" {
		version = semver.New(0, 0, 1, "", "").String()
	}

	mkCatalogData := toMeshkitCatalogData(pattern.CatalogData, infoForPkg, caveatsForPkg, version)
	artifactHubPkg := catalog.BuildArtifactHubPkg(patternName, filepath.Join(versionDir, "design.yml"), pattern.UserId.String(), version, &createdAt, mkCatalogData)

	data, err := yaml.Marshal(artifactHubPkg)
	if err != nil {
		return utils.ErrMarshal(err)
	}
	if err := os.WriteFile(filepath.Join(versionDir, "artifacthub-pkg.yml"), data, 0644); err != nil {
		return utils.ErrWriteFile(err, filepath.Join(versionDir, "artifacthub-pkg.yml"))
	}

	userFullName, userAvatarURL := userDisplay(pattern.User)

	nameYAML, err := yaml.Marshal(patternName)
	if err != nil {
		return err
	}

	content := fmt.Sprintf(`---
layout: item
name: %s
publishedVersion: %s
userId: %s
userName: %s
userAvatarURL: %s
type: %s
compatibility:
%s
patternId: %s
image: %s
patternInfo: |
  %s
patternCaveats: |
  %s
permalink: catalog/%s/%s-%s.html
URL: 'https://raw.githubusercontent.com/meshery/meshery.io/master/%s/%s/%s/design.yml'
downloadLink: %s/design.yml
---`, strings.TrimSpace(string(nameYAML)), version, pattern.UserId.String(), userFullName, userAvatarURL, patternType, compatibility, patternID, patternImageURL, patternInfo, patternCaveats, patternType, slugify(patternName), patternID, mesheryCatalogFilesDir, patternID, version, patternID)

	mdPath := filepath.Join("..", "..", "collections", "_catalog", patternType, patternID+".md")
	if err := os.WriteFile(mdPath, []byte(content), 0644); err != nil {
		return utils.ErrWriteFile(err, mdPath)
	}
	return nil
}

// userDisplay returns the full name and avatar URL of the embedded user, or
// empty strings if the API response didn't include a user object. The catalog
// list endpoint embeds the full user record, so this avoids the legacy
// per-pattern /api/identity/users/profile fan-out.
func userDisplay(user *userv1beta2.User) (string, string) {
	if user == nil {
		return "", ""
	}
	avatar := ""
	if user.AvatarUrl != nil {
		avatar = *user.AvatarUrl
	}
	return strings.TrimSpace(user.FirstName + " " + user.LastName), avatar
}

func invokeGitHubAction(contentID, assetLocation string, ghAccessToken string) error {
	payload := fmt.Sprintf(`{"ref":"master","inputs":{"contentID":"%s","assetLocation":"%s"}}`, contentID, assetLocation)
	req, err := http.NewRequest("POST", "https://api.github.com/repos/meshery/meshery.io/actions/workflows/kanvas.yml/dispatches", bytes.NewBuffer([]byte(payload)))
	if err != nil {
		return meshkitErrors.New(ErrCreateGitHubRequestCode, meshkitErrors.Alert,
			[]string{"Error creating GitHub Actions request"},
			[]string{fmt.Sprintf("Failed to create GitHub Actions request.\nError: %v", err)},
			[]string{"Invalid payload format", "Network issues"},
			[]string{"Check the payload format", "Ensure network connectivity"})
	}
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("Authorization", "Bearer "+ghAccessToken)
	req.Header.Set("X-GitHub-Api-Version", "2022-11-28")

	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		return meshkitErrors.New(ErrInvokeGitHubActionsCode, meshkitErrors.Alert,
			[]string{"Error invoking GitHub Actions"},
			[]string{fmt.Sprintf("Failed to invoke GitHub Actions.\nError: %v", err)},
			[]string{"Network issues", "Invalid GitHub token"},
			[]string{"Check network connectivity", "Ensure the GitHub token is correct"})
	}
	defer resp.Body.Close()
	return nil
}

// --- catalogData adapters --------------------------------------------------
// Read fields off the optional pointer struct from schemas without scattering
// nil-checks across call sites, and translate to meshkit's catalog type at the
// BuildArtifactHubPkg boundary (which still expects *catalogv1alpha1.CatalogData).

func catalogTypeOf(c *catalogv1alpha2.CatalogData) string {
	if c == nil {
		return ""
	}
	return string(c.Type)
}

func catalogPatternInfo(c *catalogv1alpha2.CatalogData) string {
	if c == nil {
		return ""
	}
	return c.PatternInfo
}

func catalogPatternCaveats(c *catalogv1alpha2.CatalogData) string {
	if c == nil {
		return ""
	}
	return c.PatternCaveats
}

func catalogPublishedVersion(c *catalogv1alpha2.CatalogData) string {
	if c == nil || c.PublishedVersion == nil {
		return ""
	}
	return *c.PublishedVersion
}

func catalogCompatibility(c *catalogv1alpha2.CatalogData) []string {
	if c == nil {
		return nil
	}
	out := make([]string, len(c.Compatibility))
	for i, v := range c.Compatibility {
		out[i] = string(v)
	}
	return out
}

func toMeshkitCatalogData(c *catalogv1alpha2.CatalogData, info, caveats, version string) *catalogv1alpha1.CatalogData {
	out := &catalogv1alpha1.CatalogData{
		PublishedVersion: version,
		PatternInfo:      info,
		PatternCaveats:   caveats,
	}
	if c == nil {
		return out
	}
	out.Type = catalogv1alpha1.CatalogDataType(c.Type)
	if len(c.Compatibility) > 0 {
		out.Compatibility = make([]catalogv1alpha1.CatalogDataCompatibility, len(c.Compatibility))
		for i, v := range c.Compatibility {
			out.Compatibility[i] = catalogv1alpha1.CatalogDataCompatibility(v)
		}
	}
	if c.SnapshotURL != nil {
		out.SnapshotURL = *c.SnapshotURL
	}
	return out
}

func ErrHTTPGetRequest(err error, ep string) error {
	return meshkitErrors.New(ErrHTTPGetRequestCode, meshkitErrors.Alert,
		[]string{"HTTP GET request failed"},
		[]string{fmt.Sprintf("Failed to fetch data from endpoint: %s\nError: %v", ep, err)},
		[]string{"The server might be down", "The endpoint URL might be incorrect"},
		[]string{"Check the endpoint URL", "Ensure the server is running"})
}

func ErrDecodingContent(err error) error {
	return meshkitErrors.New(ErrDecodingContentCode, meshkitErrors.Alert,
		[]string{"Error decoding content"},
		[]string{fmt.Sprintf("Unable to decode design caveats and info.\nError: %v", err)},
		[]string{
			"Content may be an invalid string.",
			"The content might be missing or incomplete.",
		},
		[]string{
			"Ensure that the content is a valid string.",
			"Check if the content is complete and not truncated.",
		})
}

func ErrCreatingVersionDir(err error) error {
	return meshkitErrors.New(ErrCreateVersionDirCode, meshkitErrors.Alert,
		[]string{"Error creating version directory"},
		[]string{fmt.Sprintf("Unable to create version directory.\nError: %v", err)},
		[]string{
			"The specified path might be incorrect or insufficient permissions.",
			"There might be an issue with the file system.",
		},
		[]string{
			"Ensure the path is correct and you have the necessary permissions.",
			"Check the file system for errors or space issues.",
		})
}
