class Videos::Builder
  def initialize(fetch_request)
    @fetch_request = fetch_request
  end

  def call(videos)
    save_videos(videos)
  end

  protected

  def save_videos(videos)
    videos.each do |attrs|
      v = ::Video.find_or_initialize_by(external_id: attrs[:external_id], url: @fetch_request.url)
      v.update(attrs)
    end
  end
end