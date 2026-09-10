package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"time"

	"gopkg.in/yaml.v3"
)

// ArtifactHubMetadata ...
type ArtifactHubMetadata struct {
	Version          string `yaml:"version,omitempty"`
	Name             string `yaml:"name,omitempty"`
	DisplayName      string `yaml:"displayName,omitempty"`
	CreatedAt        string `yaml:"createdAt,omitempty"`
	Description      string `yaml:"description,omitempty"`
	LogoPath         string `yaml:"logoPath,omitempty"`
	LogoURL          string `yaml:"logoURL,omitempty"`
	Digest           string `yaml:"digest,omitempty"`
	License          string `yaml:"license,omitempty"`
	HomeURL          string `yaml:"homeURL,omitempty"`
	AppVersion       string `yaml:"appVersion,omitempty"`
	ContainersImages []struct {
		Name        string `yaml:"name,omitempty"`
		Image       string `yaml:"image,omitempty"`
		Whitelisted string `yaml:"whitelisted,omitempty"`
	} `yaml:"containersImages,omitempty"`
	ContainsSecurityUpdates string   `yaml:"containsSecurityUpdates,omitempty"`
	Operator                string   `yaml:"operator,omitempty"`
	Deprecated              string   `yaml:"deprecated,omitempty"`
	Prerelease              string   `yaml:"prerelease,omitempty"`
	Keywords                []string `yaml:"keywords,omitempty"`
	Links                   []struct {
		Name string `yaml:"name,omitempty"`
		URL  string `yaml:"url,omitempty"`
	} `yaml:"links,omitempty"`
	Readme  string `yaml:"readme,omitempty"`
	Install string `yaml:"install,omitempty"`
	Changes []struct {
		Kind        string `yaml:"kind,omitempty"`
		Description string `yaml:"description,omitempty"`
		Links       []struct {
			Name string `yaml:"name,omitempty"`
			URL  string `yaml:"url,omitempty"`
		} `yaml:"links,omitempty"`
	} `yaml:"changes,omitempty"`
	Maintainers []struct {
		Name  string `yaml:"name,omitempty"`
		Email string `yaml:"email,omitempty"`
	} `yaml:"maintainers,omitempty"`
	Provider struct {
		Name string `yaml:"name,omitempty"`
	} `yaml:"provider,omitempty"`
	Ignore          []string `yaml:"ignore,omitempty"`
	Recommendations []struct {
		URL string `yaml:"url,omitempty"`
	} `yaml:"recommendations,omitempty"`
	Screenshots []struct {
		Title string `yaml:"title,omitempty"`
		URL   string `yaml:"url,omitempty"`
	} `yaml:"screenshots,omitempty"`
	Annotations struct {
		Key1 string `yaml:"key1,omitempty"`
		Key2 string `yaml:"key2,omitempty"`
	} `yaml:"annotations,omitempty"`
}

// HTTPClient is an interface that matches the methods needed from http.Client.
type HTTPClient interface {
	Get(url string) (*http.Response, error)
}

// DefaultClient is a default implementation of the HTTPClient interface.
type DefaultClient struct{}

// Get is a method of DefaultClient that makes the actual HTTP GET request.
func (c DefaultClient) Get(url string) (*http.Response, error) {
	return http.Get(url) //nolint
}

const (
	// entryPoint is the directory entry point for artifact hub.
	ahEntryPoint = "artifacthub"

	// directory entry point for source of designs.
	entryPoint = "collections/_catalog"

	// raw github source URL.
	sourceURL = "https://raw.githubusercontent.com/meshery/meshery.io/master/"
)

func main() {
	pwd, err := os.Getwd()
	if err != nil {
		fmt.Println("error while getting pwd")
		panic(err)
	}

	rootDir := filepath.Join(pwd, "..", "..")
	fmt.Println("rootDir", rootDir)
	libraryPath := filepath.Join(rootDir, entryPoint)
	fmt.Println("libraryPath", libraryPath)
	dirEntry, err := os.ReadDir(libraryPath)
	if err != nil {
		fmt.Println("error while listing directories under catalog")
		panic(err)
	}

	for _, entry := range dirEntry {
		if entry.Type().IsDir() {
			basePath, _ := filepath.Abs(filepath.Join(libraryPath, entry.Name()))
			directories, err := os.ReadDir(basePath)

			if err != nil {
				fmt.Println("error while listing directories under ", entry.Name())
				panic(err)
			}

			for _, dir := range directories {
				// if dir.Type().IsDir()  {
				fmt.Println("dir ", dir)
				fmt.Println("Generating artifact hub content for ", filepath.Join(basePath, dir.Name()))
				constraintTemplateContent, err := os.ReadFile(filepath.Join(basePath, dir.Name()))
				if err != nil {
					fmt.Println("error while reading template.yaml")
					panic(err)
				}

				constraintTemplate := make(map[string]interface{})
				err = yaml.Unmarshal(constraintTemplateContent, &constraintTemplate)
				if err != nil {
					fmt.Println("error while unmarshaling template.yaml")
					panic(err)
				}

				githubSourceRelativePath := filepath.Join(entryPoint, entry.Name(), dir.Name(), "template.yaml")
				createVersionDirectory(
					rootDir,
					filepath.Join(entryPoint, entry.Name(), dir.Name()),
					githubSourceRelativePath,
					constraintTemplate,
				)
				// }
			}
		}
	}
}

func createVersionDirectory(rootDir, basePath, githubSourceRelativePath string, constraintTemplate map[string]interface{}) {
	version := getConstraintTemplateVersion(constraintTemplate)

	// create directory if not exists
	destination := filepath.Join(rootDir, ahEntryPoint, basePath, version)
	if _, err := os.Stat(destination); os.IsNotExist(err) {
		err = os.MkdirAll(destination, 0o755)
		if err != nil {
			fmt.Println("error while creating version directory")
			panic(err)
		}
	}

	source := filepath.Join(rootDir, basePath)
	ahBasePath := filepath.Join(ahEntryPoint, basePath, version)

	// create artifacthub-pkg.yml file first then copy rest of the files. This will avoid unnecessary diff if there is any error while generating or updating artifacthub-pkg.yml
	// add artifact hub metadata
	addArtifactHubMetadata(filepath.Base(source), destination, ahBasePath, githubSourceRelativePath, constraintTemplate)

	// copy directory content
	err := copyDirectory(source, destination)
	if err != nil {
		fmt.Println("error while copying directories")
		panic(err)
	}
}

func addArtifactHubMetadata(sourceDirectory, destinationPath, ahBasePath, githubSourceRelativePath string, constraintTemplate map[string]interface{}) {
	metadataFilePath := filepath.Join(destinationPath, "artifacthub-pkg.yml")

	constraintTemplateHash := getConstraintTemplateHash(constraintTemplate)
	artifactHubMetadata := getMetadataIfExist(metadataFilePath)
	if artifactHubMetadata == nil {
		format := "2006-01-02 15:04:05Z"
		currentDateTime, err := time.Parse(format, time.Now().UTC().Format(format))
		if err != nil {
			fmt.Println("error while parsing current date time")
			panic(err)
		}

		artifactHubMetadata = &ArtifactHubMetadata{
			Version:     getConstraintTemplateVersion(constraintTemplate),
			Name:        getConstraintTemplateName(constraintTemplate),
			DisplayName: getConstraintTemplateTitle(constraintTemplate),
			CreatedAt:   currentDateTime.Format(time.RFC3339),
			Description: getConstraintTemplateDescription(constraintTemplate),
			License:     "Apache-2.0",
			HomeURL:     "https://meshery.io/catalog", // + sourceDirectory,
			Keywords: []string{
				"meshery",
				"meshery-designs",
			},
			Provider: struct {
				Name string `yaml:"name,omitempty"`
			}{
				Name: "Meshery Catalog",
			},
			Install: fmt.Sprintf("### Usage\n```shell\nmesheryctl design apply -f %s\n```", sourceURL+filepath.Join(ahBasePath, ".yaml")),
			Readme: fmt.Sprintf(`# %s
%s`, getConstraintTemplateTitle(constraintTemplate), getConstraintTemplateDescription(constraintTemplate)),
		}
	} else {
		// when metadata file already exists, check version to make sure it's updated if constraint template is changed
		err := checkVersion(&DefaultClient{}, artifactHubMetadata, githubSourceRelativePath)
		if err != nil {
			panic(err)
		}
	}

	// updating digest triggers artifact hub to update the package
	artifactHubMetadata.Digest = constraintTemplateHash

	artifactHubMetadataBytes, err := yaml.Marshal(artifactHubMetadata)
	if err != nil {
		fmt.Println("error while marshaling artifact hub metadata")
		panic(err)
	}

	err = os.WriteFile(filepath.Join(destinationPath, "artifacthub-pkg.yml"), artifactHubMetadataBytes, 0o600)
	if err != nil {
		fmt.Println("error while writing artifact hub metadata")
		panic(err)
	}
}

func checkVersion(httpClient HTTPClient, artifactHubMetadata *ArtifactHubMetadata, githubSourceRelativePath string) error {
	// compare hash with template.yaml in github
	githubTemplateURL := sourceURL + githubSourceRelativePath
	resp, err := httpClient.Get(githubTemplateURL)
	if err != nil {
		return fmt.Errorf("error while getting constraint template from github: %w", err)
	}
	if resp.StatusCode == http.StatusNotFound {
		fmt.Printf("constraint template %s not found in github. It is likely that constraint template is being updated locally and not merged to github yet.\n", githubSourceRelativePath)

		return nil
	}
	defer resp.Body.Close()

	githubConstraintTemplateBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("error while reading constraint template from github")
	}

	githubConstraintTemplate := make(map[string]interface{})
	err = yaml.Unmarshal(githubConstraintTemplateBytes, &githubConstraintTemplate)
	if err != nil {
		return fmt.Errorf("error while unmarshaling constraint template from github")
	}

	githubConstraintTemplateHash := getConstraintTemplateHash(githubConstraintTemplate)
	if artifactHubMetadata.Digest != githubConstraintTemplateHash {
		// compare version
		if artifactHubMetadata.Version == getConstraintTemplateVersion(githubConstraintTemplate) {
			// panic if version is same but hash is different
			return fmt.Errorf("looks like template.yaml is updated but the version is not. Please update the 'metadata.gatekeeper.sh/version' annotation in the template.yaml source")
		}
	}

	return nil
}

func getConstraintTemplateHash(constraintTemplate map[string]interface{}) string {
	constraintTemplateBytes, err := yaml.Marshal(constraintTemplate)
	if err != nil {
		fmt.Println("error while marshaling constraint template")
		panic(err)
	}

	hash := sha256.New()
	hash.Write(constraintTemplateBytes)
	return hex.EncodeToString(hash.Sum(nil))
}

func getMetadataIfExist(metadataFilePath string) *ArtifactHubMetadata {
	if _, err := os.Stat(metadataFilePath); err == nil {
		// file exists
		metadataFile, err := os.ReadFile(metadataFilePath)
		if err != nil {
			fmt.Println("error while reading artifact hub metadata")
			panic(err)
		}

		artifactHubMetadata := ArtifactHubMetadata{}
		err = yaml.Unmarshal(metadataFile, &artifactHubMetadata)
		if err != nil {
			fmt.Println("error while unmarshaling artifact hub metadata")
			panic(err)
		}

		return &artifactHubMetadata
	}

	return nil
}

// copyDirectory copies a whole directory recursively.
func copyDirectory(src string, dst string) error {
	var err error
	var directoryFileInfo []fs.DirEntry
	var sourceFileInfo os.FileInfo

	if sourceFileInfo, err = os.Stat(src); err != nil {
		return err
	}

	if err = os.MkdirAll(dst, sourceFileInfo.Mode()); err != nil {
		return err
	}

	if directoryFileInfo, err = os.ReadDir(src); err != nil {
		return err
	}

	for _, fd := range directoryFileInfo {
		sourceFilePath := path.Join(src, fd.Name())
		destinationFilePath := path.Join(dst, fd.Name())

		if fd.IsDir() {
			if err = copyDirectory(sourceFilePath, destinationFilePath); err != nil {
				fmt.Println(err)
				panic(err)
			}
		} else {
			if err = copyFile(sourceFilePath, destinationFilePath); err != nil {
				fmt.Println(err)
				panic(err)
			}
		}
	}
	return nil
}

// copyFile copies a single file from src to dst.
func copyFile(src, dst string) error {
	var err error
	var sourceFile *os.File
	var destinationFile *os.File
	var sourceFileInfo os.FileInfo

	if sourceFile, err = os.Open(src); err != nil {
		return err
	}
	defer sourceFile.Close()

	if destinationFile, err = os.Create(dst); err != nil {
		return err
	}
	defer destinationFile.Close()

	if _, err = io.Copy(destinationFile, sourceFile); err != nil {
		return err
	}

	if sourceFileInfo, err = os.Stat(src); err != nil {
		return err
	}
	return os.Chmod(dst, sourceFileInfo.Mode())
}

func getConstraintTemplateMetadata(constraintTemplate map[string]interface{}) map[string]interface{} {
	fmt.Println("meta:", constraintTemplate)
	// metadata, ok := constraintTemplate[""].(map[string]interface{})
	// if !ok {
	// 	panic("error while retrieving constraintTemplate metadata")
	// }
	return constraintTemplate
}

func getConstraintTemplateAnnotations(constraintTemplate map[string]interface{}) map[string]interface{} {
	metadata := getConstraintTemplateMetadata(constraintTemplate)

	annotations, ok := metadata["annotations"].(map[string]interface{})
	if !ok {
		panic("error while retrieving constraintTemplate annotations")
	}

	return annotations
}

func getConstraintTemplateName(constraintTemplate map[string]interface{}) string {
	metadata := getConstraintTemplateMetadata(constraintTemplate)

	return fmt.Sprintf("%s", metadata["name"])
}

func getConstraintTemplateVersion(constraintTemplate map[string]interface{}) string {
	annotations := getConstraintTemplateAnnotations(constraintTemplate)

	return fmt.Sprintf("%s", annotations["metadata.gatekeeper.sh/version"])
}

func getConstraintTemplateTitle(constraintTemplate map[string]interface{}) string {
	annotations := getConstraintTemplateAnnotations(constraintTemplate)

	return fmt.Sprintf("%s", annotations["metadata.gatekeeper.sh/title"])
}

func getConstraintTemplateDescription(constraintTemplate map[string]interface{}) string {
	annotations := getConstraintTemplateAnnotations(constraintTemplate)

	return fmt.Sprintf("%s", annotations["description"])
}
