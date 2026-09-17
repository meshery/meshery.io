jekyll=bundle exec jekyll
REPO_ROOT := $(shell git rev-parse --show-toplevel)
ARTIFACTHUB_SCRIPT_DIR := $(REPO_ROOT)/assets/scripts

site:
	@# Prefer Docker when available and running; otherwise use local gems only if already installed
	@if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then $(MAKE) docker; elif bundle check >/dev/null 2>&1; then $(jekyll) serve --drafts --incremental --livereload --config _config_dev.yml; else echo "Docker is not running and required gems are not installed."; echo "Start Docker (so 'make site' can run in container) or run: bundle install --path vendor/bundle"; exit 1; fi

site-no-incremental:
	@# Prefer Docker when available and running; otherwise use local gems only if already installed
	@if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then $(MAKE) docker; elif bundle check >/dev/null 2>&1; then $(jekyll) serve --drafts --livereload --config _config_dev.yml; else echo "Docker is not running and required gems are not installed."; echo "Start Docker (so 'make site' can run in container) or run: bundle install --path vendor/bundle"; exit 1; fi

build:
	$(jekyll) build --drafts

docker:
	@# Run Jekyll with the repo's Gemfile dependencies isolated in a Docker volume.
	docker run --name meshery-io --rm -p 4000:4000 -p 35729:35729 -v "$(CURDIR)":"/srv/jekyll" -v meshery-io-bundle:"/usr/local/bundle" -w /srv/jekyll jekyll/jekyll:4 sh -lc 'bundle check || bundle install; bundle exec jekyll serve --host 0.0.0.0 --drafts --livereload --config _config_dev.yml'

docker-stop:
	docker stop meshery-io

docker-logs:
	docker logs -f meshery-io

.PHONY: helm-repo-update
helm-repo-update:
	helm repo index charts

.PHONY: artifacthub-artifacts
artifacthub-artifacts:
	cd $(ARTIFACTHUB_SCRIPT_DIR); go run hub.go

# Clean target to remove generated files
.PHONY: clean
clean:
	rm -rf _site
	rm -rf .jekyll-metadata
	rm -rf .jekyll-cache
	docker stop meshery-io || true
	docker rm meshery-io || true
