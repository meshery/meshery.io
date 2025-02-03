jekyll=bundle exec jekyll
REPO_ROOT := $(shell git rev-parse --show-toplevel)
ARTIFACTHUB_SCRIPT_DIR := $(REPO_ROOT)/assets/scripts

site:
	bundle install; $(jekyll) serve --drafts --incremental --livereload --config _config_dev.yml

site-no-incremental:
	rvm use 3.2.2; bundle install; $(jekyll) serve --drafts --livereload --config _config_dev.yml

build:
	$(jekyll) build --drafts

docker:
	docker run --name meshery-io -d --rm -p 4000:4000 -v `pwd`:"/srv/jekyll" jekyll/jekyll:latest bash -c "bundle install; jekyll serve --drafts --livereload"

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