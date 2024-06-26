module ApplicationHelper
  include Pagy::Frontend
  def render_turbo_stream_flash_messages
    turbo_stream.prepend "flash", partial: "layouts/flash"
  end

  def truncate_link_title(title)
    truncate(title, length: 100)
  end
end
