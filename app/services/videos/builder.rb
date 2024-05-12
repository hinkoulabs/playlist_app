class Videos::Builder
  def initialize(data_source)
    @data_source = data_source
  end

  def call(videos_attributes)
    videos_attributes.each { |attrs| attrs[:data_source_id] =  @data_source.id }
    Video.upsert_all(videos_attributes, unique_by: %i[external_id data_source_id])
  end
end