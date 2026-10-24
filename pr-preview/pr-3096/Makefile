jekyll=bundle exec jekyll
REPO_ROOT := $(shell git rev-parse --show-toplevel)
ARTIFACTHUB_SCRIPT_DIR := $(REPO_ROOT)/assets/scripts
LINT_BASE_REMOTE := $(shell git remote | grep -qx upstream && echo upstream || echo origin)
LINT_BASE_REF ?= $(LINT_BASE_REMOTE)/master
STYLE_GLOBS := '*.css' '*.scss'
NEW_STYLE_FILES = $(shell { git diff --name-only --diff-filter=A $(LINT_MERGE_BASE) -- $(STYLE_GLOBS); git ls-files --others --exclude-standard -- $(STYLE_GLOBS); } | sort -u)
LINT_MERGE_BASE = $(shell git merge-base HEAD $(LINT_BASE_REF))
EXISTING_STYLE_FILES = $(shell git diff --name-only --diff-filter=MR $(LINT_MERGE_BASE) -- $(STYLE_GLOBS))

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

.PHONY: lint-prerequisites
lint-prerequisites:
	@test -x node_modules/.bin/eslint -a -x node_modules/.bin/prettier || { echo "Dependencies missing. Run: npm ci"; exit 1; }
	@git rev-parse --verify --quiet $(LINT_BASE_REF) >/dev/null || { echo "Base ref '$(LINT_BASE_REF)' not found. Run: git fetch $(LINT_BASE_REMOTE) (or pass LINT_BASE_REF=...)"; exit 1; }

# JS (existing + new): errors, blocking.
# CSS/SCSS new files: errors, blocking. Existing files: warning only, never fails.
.PHONY: lint
lint: lint-prerequisites
	@status=0; \
	echo "==> ESLint: all JS files (blocking)"; \
	npm run lint || status=1; \
	if [ -n "$(NEW_STYLE_FILES)" ]; then \
		echo "==> Prettier: new CSS/SCSS files (blocking)"; \
		npx --no-install prettier --check $(NEW_STYLE_FILES) || status=1; \
	fi; \
	if [ -n "$(EXISTING_STYLE_FILES)" ]; then \
		echo "==> Prettier: existing changed CSS/SCSS files (warning only)"; \
		unformatted=$$(npx --no-install prettier --list-different $(EXISTING_STYLE_FILES)); \
		if [ -n "$$unformatted" ]; then \
			echo "warning: existing changed files are not Prettier-formatted (non-blocking):"; \
			echo "$$unformatted" | sed 's/^/  /'; \
		fi; \
	fi; \
	exit $$status

# Fixes all JS files, and only NEW CSS/SCSS files. Existing CSS/SCSS is never touched.
.PHONY: lint-fix
lint-fix: lint-prerequisites
	@status=0; \
	echo "==> ESLint --fix: all JS files"; \
	npm run lint:fix || status=1; \
	if [ -n "$(NEW_STYLE_FILES)" ]; then \
		echo "==> Prettier --write: new CSS/SCSS files"; \
		npx --no-install prettier --write $(NEW_STYLE_FILES) || status=1; \
	fi; \
	echo "Existing CSS/SCSS files are left untouched."; \
	exit $$status