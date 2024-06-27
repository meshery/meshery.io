package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/Masterminds/semver/v3"
	"gopkg.in/yaml.v3"

	meshkitErrors "github.com/layer5io/meshkit/errors"
	"github.com/layer5io/meshkit/logger"
	"github.com/layer5io/meshkit/utils"

	"github.com/layer5io/meshkit/models/catalog/v1alpha1"
	"github.com/layer5io/meshkit/utils/catalog"
)

type CatalogPattern struct {
	ID          string               `json:"id"`
	Name        string               `json:"name"`
	Version     string               `json:"version"`
	PatternFile string               `json:"pattern_file"`
	CatalogData v1alpha1.CatalogData `json:"catalog_data"`
	UserID      string               `json:"user_id"`
}

type UserInfo struct {
	UserID    string `json:"user_id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	AvatarURL string `json:"avatar_url"`
}

const (
	mesheryCloudBaseURL    = "https://meshery.layer5.io"
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

func fetchCatalogPatterns() ([]byte, error) {
	resp, err := http.Get(fmt.Sprintf("%s/api/catalog/content/pattern", mesheryCloudBaseURL))
	if err != nil {
		return nil, ErrHTTPGetRequest(err, fmt.Sprintf("%s/api/catalog/content/pattern", mesheryCloudBaseURL))
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
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

	if err := writePatternFile(pattern, patternType, patternInfo, patternCaveats, compatibility, patternImageURL); err != nil {
		return err
	}
	if err := invokeGitHubAction(pattern.ID, patternImageURL, token); err != nil {
		return err
	}

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

func writePatternFile(pattern CatalogPattern, patternType, patternInfo, patternCaveats, compatibility, patternImageURL string) error {
	dir := filepath.Join("..", "..", mesheryCatalogFilesDir, pattern.ID)
	designFilePath := filepath.Join(dir, "design.yml")
	os.MkdirAll(dir, 0755)
	if err := ioutil.WriteFile(designFilePath, []byte(pattern.PatternFile), 0644); err != nil {
		return utils.ErrWriteFile(err, designFilePath)
	}

	contenttemp, err := ioutil.ReadFile(designFilePath)
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

	format := "2006-01-02 15:04:05Z"
	currentDateTime, err := time.Parse(format, time.Now().UTC().Format(format))

	version := pattern.CatalogData.PublishedVersion
	if version == "" {
		version = semver.New(0, 0, 1, "", "").String()
	} else {
		v, err := semver.NewVersion(version)
		if err != nil {
			return meshkitErrors.New(ErrInvalidVersionCode, meshkitErrors.Alert,
				[]string{"Failed to parse the version"},
				[]string{fmt.Sprintf("The provided version '%s' is invalid.\nError: %v", version, err)},
				[]string{"The version string is not in a valid semantic version format"},
				[]string{"Ensure the version string follows semantic versioning format", "Check for typos or incorrect format"})
		}
		version = v.IncPatch().String()
	}

	artifactHubPkg := catalog.BuildArtifactHubPkg(pattern.Name, filepath.Join(dir, "design.yml"), pattern.UserID, version, currentDateTime.Format(time.RFC3339), &pattern.CatalogData)
	data, err := yaml.Marshal(artifactHubPkg)
	if err != nil {
		return utils.ErrMarshal(err)
	}
	if err := os.WriteFile(filepath.Join(dir, "artifacthub-pkg.yml"), data, 0644); err != nil {
		return utils.ErrWriteFile(err, filepath.Join(dir, "artifacthub-pkg.yml"))
	}

	userInfo, err := fetchUserInfo(pattern.UserID)
	if err != nil {
		return err
	}
	userFullName := fmt.Sprintf("%s %s", userInfo.FirstName, userInfo.LastName)

	content := fmt.Sprintf(`---
layout: item
name: %s
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
URL: 'https://raw.githubusercontent.com/meshery/meshery.io/master/%s/%s/design.yml'
downloadLink: %s/design.yml
---`, pattern.Name, pattern.UserID, userFullName, userInfo.AvatarURL, patternType, compatibility, pattern.ID, patternImageURL, patternInfo, patternCaveats, mesheryCatalogFilesDir, pattern.ID, pattern.ID)

	if err := ioutil.WriteFile(fmt.Sprintf(filepath.Join("..", "..", "collections", "_catalog", patternType, pattern.ID+".md")), []byte(content), 0644); err != nil {
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
	body, err := ioutil.ReadAll(resp.Body)
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
	req, err := http.NewRequest("POST", "https://api.github.com/repos/meshery/meshery.io/actions/workflows/meshmap.yml/dispatches", bytes.NewBuffer([]byte(payload)))
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
