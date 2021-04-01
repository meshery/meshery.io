require 'json'
require 'net/http'

module ExternalJSON
  class ExternalJSON_tag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
        if /(.+) from url (.+)/.match(@text)
          resp = Net::HTTP.get_response(URI($2.strip))
          data = resp.body
          context[$1] = JSON data
          nil
        else
          # syntax error
          raise ArgumentError, 'ERROR:bad_syntax'
        end
    end
  end
end

Liquid::Template.register_tag('externalJSON', ExternalJSON::ExternalJSON_tag)