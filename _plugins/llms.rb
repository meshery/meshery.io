require "nokogiri"
require "reverse_markdown"

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
      out << to_markdown(home) << "\n\n" if home
      out << "## Full content\n\n- [llms-full.txt](#{@base}/llms-full.txt)\n"
      out
    end

    # llms-full.txt: every page, post and collection document as Markdown
    def llms_full
      out = +"# #{@site.config['title']}\n\n"
      desc = @site.config["description"].to_s.strip
      out << "> #{desc}\n\n" unless desc.empty?
      ordered.each do |doc|
        md = to_markdown(doc)
        next if md.empty?
        title = doc.data["title"] || doc.url
        out << "---\n\n## #{title}\n\nURL: #{@base}#{doc.url}\n\n#{md}\n\n"
      end
      out
    end

    private

    def entries
        docs = @site.collections.values.flat_map(&:docs)   # real documents only, no static files

        (@site.pages + docs).select do |d|
            d.data["llms"] != false &&
            d.respond_to?(:output) &&
            !d.output.to_s.empty? &&
            (d.url == "/" || d.url.end_with?("/", ".html")) &&
            !@cfg["exclude_paths"].include?(d.url)
        end
    end

    def ordered
      home, rest = entries.partition { |d| d.url == "/" }
      pages, docs = rest.partition { |d| d.is_a?(Jekyll::Page) }
      home + pages.sort_by(&:url) + docs.sort_by(&:date).reverse
    end

    def to_markdown(doc)
      html = Nokogiri::HTML(doc.output)
      node = html.at_css(@cfg["content_selector"]) || html.at_css("body")
      return "" unless node

      node.css(@cfg["exclude_selectors"].join(",")).remove
      node.css('a[href^="/"]').each { |a| a["href"] = @base + a["href"] }

      md = ReverseMarkdown.convert(node.inner_html, unknown_tags: :bypass, github_flavored: true)
      md.gsub(/\n{3,}/, "\n\n").strip
    end
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  builder = LlmsTxt::Builder.new(site)
  File.write(File.join(site.dest, "llms.txt"), builder.llms)
  File.write(File.join(site.dest, "llms-full.txt"), builder.llms_full)
end