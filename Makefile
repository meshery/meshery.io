jekyll=bundle exec jekyll

site:
	$(jekyll) serve --drafts --livereload

build:
	$(jekyll) build --drafts

docker:
	docker run --name meshery-io -d --rm -p 4000:4000 -v `pwd`:"/srv/jekyll" jekyll/jekyll:4.0.0 bash -c "bundle install; jekyll serve --drafts --livereload"

docker-stop:
	docker stop meshery-io

docker-logs:
	docker logs -f meshery-io