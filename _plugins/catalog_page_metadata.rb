Jekyll::Hooks.register :documents, :pre_render do |document|
  next unless document.collection&.label == "catalog"
  next if document.data["name"].to_s.empty?

  document.data["title"] = document.data["name"]
end
