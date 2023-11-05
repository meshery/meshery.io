jekyll=bundle exec jekyll

site:
	bundle install; $(jekyll) serve --drafts --incremental
# --livereload 

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
