package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"gopkg.in/yaml.v3"

	"github.com/layer5io/meshkit/models/catalog/v1alpha1"
	"github.com/layer5io/meshkit/utils/catalog"
)

// CatalogPattern represents the catalog pattern structure
type CatalogPattern struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	PatternFile string `json:"pattern_file"`
	CatalogData struct {
		PatternInfo    string      `json:"pattern_info"`
		PatternCaveats string      `json:"pattern_caveats"`
		Type           string      `json:"type"`
		ImageURL       interface{} `json:"imageURL"`
		Compatibility  []string    `json:"compatibility"`
	} `json:"catalog_data"`
	UserID string `json:"user_id"`
}

// UserProfile represents the user profile structure
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

	catalogPatterns := fetchCatalogPatterns()

	var patterns struct {
		Patterns []CatalogPattern `json:"patterns"`
	}
	if err := json.Unmarshal(catalogPatterns, &patterns); err != nil {
		log.Error(meshkitErrors.New(ErrUnmarshalCatalogPatternCode, meshkitErrors.Alert, []string{"Unable to unmarshal the catalog pattern"}, []string{err.Error()}, []string{}, []string{}))
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
		fmt.Println(pattern.ID)
	}
}

func fetchCatalogPatterns() []byte {
	resp, err := http.Get(fmt.Sprintf("%s/api/catalog/content/pattern", mesheryCloudBaseURL))
	if err != nil {
		log.Printf("Error connecting to Meshery Cloud: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response body: %v\n", err)
		return nil
	}
	return body
}

func processPattern(pattern CatalogPattern, ghAccessToken string) error {
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
	invokeGitHubAction(pattern.ID, patternImageURL, ghAccessToken)

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
	deployFilePath := filepath.Join(dir, "deploy.yml")
	os.MkdirAll(dir, 0755)
	ioutil.WriteFile(deployFilePath, []byte(pattern.PatternFile), 0644)

	deployContent, err := ioutil.ReadFile(deployFilePath)
	if err != nil {
		return fmt.Errorf("Failed to read file: %v", err)
	}
	var dataMap map[string]interface{}
	if err := yaml.Unmarshal(deployContent, &dataMap); err != nil {
		return fmt.Errorf("Failed to unmarshal YAML: %v", err)
	}
	if services, ok := dataMap["services"]; !ok || services == nil {
		patternImageURL = "/assets/images/logos/service-mesh-pattern.svg"
	}

	format := "2006-01-02 15:04:05Z"
	currentDateTime, err := time.Parse(format, time.Now().UTC().Format(format))

	artifactHubPkg := catalog.BuildArtifactHubPkg(pattern.Name, filepath.Join(dir, "deploy.yml"), pattern.UserID, "1.0.0", currentDateTime.Format(time.RFC3339), &pattern.CatalogData)
	data, err := yaml.Marshal(artifactHubPkg)
	if err != nil {
		return fmt.Errorf("failed to marshal YML: %w", err)
	}
	if err := os.WriteFile(filepath.Join(dir, "artifacthub-pkg.yml"), data, 0644); err != nil {
		return fmt.Errorf("failed to write file: %w", err)
	}

	userInfo := fetchUserInfo(pattern.UserID)
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
URL: 'https://raw.githubusercontent.com/meshery/meshery.io/master/%s/%s/deploy.yml'
downloadLink: %s/deploy.yml
---`, pattern.Name, pattern.UserID, userFullName, userInfo.AvatarURL, patternType, compatibility, pattern.ID, patternImageURL, patternInfo, patternCaveats, mesheryCatalogFilesDir, pattern.ID, pattern.ID)

	ioutil.WriteFile(fmt.Sprintf(filepath.Join("..", "..", "collections", "_catalog", patternType, pattern.ID+".md")), []byte(content), 0644)

	return nil
}

func fetchUserInfo(userID string) UserInfo {
	resp, err := http.Get(fmt.Sprintf("%s/api/identity/users/profile/%s", mesheryCloudBaseURL, userID))
	if err != nil {
		log.Printf("Error fetching User details: %v\n", err)
		return UserInfo{}
	}
	defer resp.Body.Close()

	var userInfo UserInfo
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading user info response bod: %v\n", err)
		return UserInfo{}
	}
	json.Unmarshal(body, &userInfo)

	return userInfo
}

func invokeGitHubActions(contentID, assetLocation string, ghAccessToken string) {
	payload := fmt.Sprintf(`{"ref":"master","inputs":{"contentID":"%s","assetLocation":"%s"}}`, contentID, assetLocation)
	req, err := http.NewRequest("POST", "https://api.github.com/repos/meshery/meshery.io/actions/workflows/meshmap.yml/dispatches", bytes.NewBuffer([]byte(payload)))
	if err != nil {
		log.Printf("Error creating GitHub Actions request: %v", err)
		return
	}
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("Authorization", "Bearer "+ghAccessToken)
	req.Header.Set("X-GitHub-Api-Version", "2022-11-28")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error invoking GitHub Actions: %v", err)
		return
	}
	defer resp.Body.Close()
}
