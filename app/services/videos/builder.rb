class Videos::Builder
  def initialize(data_source)
    @data_source = data_source
  end

  def call(videos)
    save_videos(videos)
  end

  protected

  def save_videos(videos)
    videos.each do |attrs|
      v = @data_source.videos.find_or_initialize_by(external_id: attrs[:external_id])
      v.update(attrs)
    end
  end
end