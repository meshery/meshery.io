require "nokogiri"
require "reverse_markdown"
require "addressable/uri" # already a Jekyll dependency, no Gemfile change needed

module LlmsTxt
  class Builder
    DEFAULTS = {
      "content_selector"  => "main",
      "exclude_selectors" => %w[nav footer aside script style noscript img picture svg form iframe],
      "exclude_paths"     => ["/404.html"]
    }.freeze

    def initialize(site)
      @site = site
      @cfg  = DEFAULTS.merge(site.config["llms"] || {})
      @base = "#{site.config['url']}#{site.config['baseurl']}".chomp("/")
    end

    # llms.txt: the home page content as Markdown
    def llms
      home = entries.find { |d| d.url == "/" }
      out  = +"# #{@site.config['title']}\n\n"
      desc = @site.config["description"].to_s.strip
      out << "> #{desc}\n\n" unless desc.empty?
      if home
        md = to_markdown(home)
        out << md << "\n\n" unless md.empty?
      end
      out << "## Full content\n\n- [llms-full.txt](#{@base}/llms-full.txt)\n"
      out
    end

    # llms-full.txt: every page, post and collection document as Markdown
    def llms_full
      out  = +"# #{@site.config['title']}\n\n"
      desc = @site.config["description"].to_s.strip
      out << "> #{desc}\n\n" unless desc.empty?
      ordered.each do |doc|
        md = to_markdown(doc)
        next if md.empty?
        title = doc.data["title"] || doc.url
        out << "---\n\n## #{title}\n\nURL: #{@base}#{normalized_path(doc)}\n\n#{md}\n\n"
      end
      out
    end

    private

    # Only documents Jekyll actually publishes as HTML.
    # Output is NOT checked here: on incremental builds unchanged documents have
    # an empty output, so their HTML is read back from _site in rendered_html.
    def entries
      docs = @site.collections.values.flat_map(&:docs) # real documents only, no static files

      (@site.pages + docs).select do |d|
        d.data["llms"] != false &&
          d.respond_to?(:output) &&
          (!d.respond_to?(:write?) || d.write?) && # skips output:false collections, future-dated and unpublished docs
          d.output_ext == ".html" &&               # works for extensionless permalinks too
          !@cfg["exclude_paths"].include?(d.url)
      end.uniq(&:url)
    end

    def ordered
      home, rest = entries.partition { |d| d.url == "/" }
      pages, docs = rest.partition { |d| d.is_a?(Jekyll::Page) }
      home + pages.sort_by(&:url) + docs.sort_by(&:date).reverse
    end

    # Rendered HTML of a document. Fresh output when it was rendered in this
    # build, otherwise the file written by a previous build (incremental mode).
    def rendered_html(doc)
      html = doc.output.to_s
      return html unless html.empty?

      path = doc.destination(@site.dest)
      File.file?(path) ? File.read(path, encoding: "UTF-8") : ""
    end

    # Percent-encoded document path, safe for non-ASCII permalinks like /café/.
    def normalized_path(doc)
      Addressable::URI.parse(doc.url).normalize.to_s
    rescue Addressable::URI::InvalidURIError
      doc.url
    end

    def to_markdown(doc)
      raw = rendered_html(doc)
      return "" if raw.empty?

      html = Nokogiri::HTML(raw)
      node = html.at_css(@cfg["content_selector"]) || html.at_css("body")
      return "" unless node

      node.css(@cfg["exclude_selectors"].join(",")).remove
      absolutize_links(node, doc)

      md = ReverseMarkdown.convert(node.inner_html, unknown_tags: :bypass, github_flavored: true)
      md.gsub(/\n{3,}/, "\n\n").strip
    end

    # Resolve relative links (#anchor, ../page, page.html, /root) against the
    # document's own URL. External, protocol-relative, mailto: and tel: are untouched.
    def absolutize_links(node, doc)
      page_url = Addressable::URI.parse("#{@base}#{normalized_path(doc)}")

      node.css("a[href]").each do |a|
        href = a["href"].to_s.strip
        next if href.empty? || href.start_with?("//")

        begin
          uri = Addressable::URI.parse(href)
          next if uri.scheme
          a["href"] = Addressable::URI.join(page_url, uri).normalize.to_s
        rescue Addressable::URI::InvalidURIError
          next
        end
      end
    rescue Addressable::URI::InvalidURIError
      nil # leave links untouched rather than fail the build
    end
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  builder = LlmsTxt::Builder.new(site)
  File.write(File.join(site.dest, "llms.txt"), builder.llms)
  File.write(File.join(site.dest, "llms-full.txt"), builder.llms_full)
end
