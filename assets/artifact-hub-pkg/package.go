package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
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

	"github.com/meshery/meshkit/models/catalog/v1alpha1"
	"github.com/meshery/meshkit/utils/catalog"
)

type CatalogPattern struct {
	ID          string               `json:"id"`
	Name        string               `json:"name"`
	Version     string               `json:"version"`
	PatternFile string               `json:"pattern_file"`
	CatalogData v1alpha1.CatalogData `json:"catalog_data"`
	UserID      string               `json:"user_id"`
	CreatedAt   string               `json:"created_at"`
}

type UserInfo struct {
	UserID    string `json:"user_id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	AvatarURL string `json:"avatar_url"`
}

const (
	mesheryCloudBaseURL    = "https://cloud.layer5.io"
	mesheryCatalogFilesDir = "catalog"
)

var (
	ErrUnmarshalCatalogPatternCode = "test_code"
	ErrProcessPatternCode          = "test_code"
	ErrHTTPGetRequestCode          = "test_code"
	ErrReadRespBodyCode            = "test_code"
	ErrCreateGitHubRequestCode     = "test_code"
	ErrInvokeGitHubActionsCode     = "test_code"
	ErrInvalidVersionCode          = "test_code"
	ErrCreateVersionDirCode        = "test_code"
	ErrParseCreatedAtCode          = "test_code"
)

func main() {
	token := "GH_ACCESS_TOKEN"
	log, err := logger.New("mesheryio_package", logger.Options{
		Format:   logger.SyslogLogFormat,
		LogLevel: 5,
	})
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	catalogPatterns, err := fetchCatalogPatterns()
	if err != nil {
		log.Error(err)
		return
	}

	var patterns struct {
		Patterns []CatalogPattern `json:"patterns"`
	}
	if err := json.Unmarshal(catalogPatterns, &patterns); err != nil {
		log.Error(utils.ErrUnmarshal(err))
		return
	}

	for _, pattern := range patterns.Patterns {
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
	// Convert to lowercase
	s := strings.ToLower(name)

	// Remove invalid characters
	reg := regexp.MustCompile("[^a-z0-9]+")
	s = reg.ReplaceAllString(s, "-")

	// Remove leading and trailing hyphens
	s = strings.Trim(s, "-")

	return s
}
func fetchCatalogPatterns() ([]byte, error) {
	resp, err := http.Get(fmt.Sprintf("%s/api/catalog/content/pattern?populate=pattern_file", mesheryCloudBaseURL))
	if err != nil {
		return nil, ErrHTTPGetRequest(err, fmt.Sprintf("%s/api/catalog/content/pattern", mesheryCloudBaseURL))
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, ErrReadRespBody(err)
	}
	return body, nil
}

func processPattern(pattern CatalogPattern, token string) error {
	patternImageURL := getPatternImageURL(pattern)
	patternType := getPatternType(string(pattern.CatalogData.Type))
	patternInfo := getStringOrEmpty(pattern.CatalogData.PatternInfo)
	patternCaveats := getStringOrEmpty(pattern.CatalogData.PatternCaveats)

	compatibilityStrings := make([]string, len(pattern.CatalogData.Compatibility))
	for i, v := range pattern.CatalogData.Compatibility {
		compatibilityStrings[i] = string(v)
	}
	compatibility := getCompatibility(compatibilityStrings)

	dir := filepath.Join("..", "..", "collections", "_catalog", patternType)
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		os.MkdirAll(dir, 0755)
	}

	version := pattern.CatalogData.PublishedVersion
	if version == "" {
		version = semver.New(0, 0, 1, "", "").String()
	}

	// Ensure the version directory exists within the catalog file path, creating it if necessary
	catalogFilePath := filepath.Join("..", "..", mesheryCatalogFilesDir, pattern.ID)
	versionDir := filepath.Join(catalogFilePath, version)
	if _, err := os.Stat(versionDir); os.IsNotExist(err) {
		err = os.MkdirAll(versionDir, 0755)
		if err != nil {
			return ErrCreatingVersionDir(err)
		}
	}

	if err := writePatternFile(pattern, versionDir, patternType, patternInfo, patternCaveats, compatibility, patternImageURL); err != nil {
		return err
	}
	// if err := invokeGitHubAction(pattern.ID, patternImageURL, token); err != nil {
	// 	return err
	// }

	fmt.Println("Pattern processed successfully:", pattern.Name)
	return nil
}

func getPatternImageURL(pattern CatalogPattern) string {
	var imageURL string
	if pattern.CatalogData.SnapshotURL == nil {
		imageURL = fmt.Sprintf("https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/design-assets/%s-light.png,https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/design-assets/%s-dark.png", pattern.ID, pattern.ID)
	} else {
		if len(pattern.CatalogData.SnapshotURL) == 1 {
			imageURL = pattern.CatalogData.SnapshotURL[0]
		} else if len(pattern.CatalogData.SnapshotURL) > 1 {
			imageURL = strings.Join(pattern.CatalogData.SnapshotURL, ",")
		}
	}
	return imageURL
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
	var compatLines []string
	for _, compat := range compatibility {
		compatLines = append(compatLines, fmt.Sprintf("    - %s", compat))
	}
	return strings.Join(compatLines, "\n")
}

func decodeURIComponent(encodedURI string) (string, error) {
	decoded, err := url.QueryUnescape(encodedURI)
	if err != nil {
		return "", err
	}
	return decoded, nil
}

func writePatternFile(pattern CatalogPattern, versionDir, patternType, patternInfo, patternCaveats, compatibility, patternImageURL string) error {
	designFilePath := filepath.Join(versionDir, "design.yml")
	if err := os.WriteFile(designFilePath, []byte(pattern.PatternFile), 0644); err != nil {
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

	parsedTime, err := time.Parse(time.RFC3339Nano, pattern.CreatedAt)
	if err != nil {
		return ErrParsingCreatedAt(err)
	}

	if pattern.CatalogData.PatternInfo == "" {
		pattern.CatalogData.PatternInfo = pattern.Name
	}

	pattern.CatalogData.PatternInfo, err = decodeURIComponent(pattern.CatalogData.PatternInfo)
	if err != nil {
		return ErrDecodingContent(err)
	}

	pattern.CatalogData.PatternCaveats, err = decodeURIComponent(pattern.CatalogData.PatternCaveats)
	if err != nil {
		return ErrDecodingContent(err)
	}

	version := pattern.CatalogData.PublishedVersion
	if version == "" {
		version = semver.New(0, 0, 1, "", "").String()
	}

	artifactHubPkg := catalog.BuildArtifactHubPkg(pattern.Name, filepath.Join(versionDir, "design.yml"), pattern.UserID, version, &parsedTime, &pattern.CatalogData)

	data, err := yaml.Marshal(artifactHubPkg)
	if err != nil {
		return utils.ErrMarshal(err)
	}

	if err := os.WriteFile(filepath.Join(versionDir, "artifacthub-pkg.yml"), data, 0644); err != nil {
		return utils.ErrWriteFile(err, filepath.Join(versionDir, "artifacthub-pkg.yml"))
	}

	userInfo, err := fetchUserInfo(pattern.UserID)
	if err != nil {
		return err
	}
	userFullName := fmt.Sprintf("%s %s", userInfo.FirstName, userInfo.LastName)

	// Use yaml.Marshal for pattern.Name to ensure proper escaping
	nameYAML, err := yaml.Marshal(pattern.Name)
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
---`, strings.TrimSpace(string(nameYAML)), version, pattern.UserID, userFullName, userInfo.AvatarURL, patternType, compatibility, pattern.ID, patternImageURL, patternInfo, patternCaveats, patternType, slugify(pattern.Name), pattern.ID, mesheryCatalogFilesDir, pattern.ID, version, pattern.ID)

	if err := os.WriteFile(fmt.Sprintf(filepath.Join("..", "..", "collections", "_catalog", patternType, pattern.ID+".md")), []byte(content), 0644); err != nil {
		return utils.ErrWriteFile(err, filepath.Join("..", "..", "collections", "_catalog", patternType, pattern.ID+".md"))
	}

	return nil
}

func fetchUserInfo(userID string) (UserInfo, error) {
	resp, err := http.Get(fmt.Sprintf("%s/api/identity/users/profile/%s", mesheryCloudBaseURL, userID))
	if err != nil {
		return UserInfo{}, ErrHTTPGetRequest(err, fmt.Sprintf("%s/api/identity/users/profile/%s", mesheryCloudBaseURL, userID))
	}
	defer resp.Body.Close()

	var userInfo UserInfo
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return UserInfo{}, ErrReadRespBody(err)
	}

	if err := json.Unmarshal(body, &userInfo); err != nil {
		return UserInfo{}, utils.ErrUnmarshal(err)
	}

	return userInfo, nil
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

	client := &http.Client{}
	resp, err := client.Do(req)
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

func ErrHTTPGetRequest(err error, ep string) error {
	return meshkitErrors.New(ErrHTTPGetRequestCode, meshkitErrors.Alert,
		[]string{"HTTP GET request failed"},
		[]string{fmt.Sprintf("Failed to fetch data from endpoint: %s\nError: %v", ep, err)},
		[]string{"The server might be down", "The endpoint URL might be incorrect"},
		[]string{"Check the endpoint URL", "Ensure the server is running"})
}

func ErrReadRespBody(err error) error {
	return meshkitErrors.New(ErrReadRespBodyCode, meshkitErrors.Alert,
		[]string{"Failed to read response body"},
		[]string{fmt.Sprintf("Unable to read the response body from the server.\nError: %v", err)},
		[]string{"The response body might be too large", "There could be a network issue"},
		[]string{"Ensure the server returns a valid and readable response body."})
}

func ErrDecodingContent(err error) error {
	return meshkitErrors.New(ErrReadRespBodyCode, meshkitErrors.Alert,
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

func ErrParsingCreatedAt(err error) error {
	return meshkitErrors.New(ErrParseCreatedAtCode, meshkitErrors.Alert,
		[]string{"Error parsing CreatedAt timestamp"},
		[]string{fmt.Sprintf("Unable to parse CreatedAt timestamp.\nError: %v", err)},
		[]string{
			"The timestamp format might be incorrect.",
			"The provided CreatedAt value could be malformed.",
		},
		[]string{
			"Ensure the timestamp format follows the RFC3339Nano standard.",
			"Verify the CreatedAt value is properly formatted.",
		})
}
