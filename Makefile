jekyll=bundle exec jekyll
REPO_ROOT := $(shell git rev-parse --show-toplevel)
ARTIFACTHUB_SCRIPT_DIR := $(REPO_ROOT)/assets/scripts

site:
	bundle install; $(jekyll) serve --drafts --incremental --livereload 

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