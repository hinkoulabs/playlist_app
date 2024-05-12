# app/views/videos/index.json.jbuilder

json.records @videos do |video|
  json.extract! video, :id, :title, :description, :thumbnail_url, :view_count
end

json.meta do
  json.total @total_count
  json.total_pages @total_pages
  json.current_page @current_page
  json.per_page @per_page
end
