# Adapter to external services

module Videos::Adapters::Default
  def self.default_page
    1
  end

  # @return Hash of query params to send request to support pagination
  def self.page_params(page)
    {
      page: page
    }
  end

  # @return Array[Hash] where Hash has the following keys
  # - :title
  # - :description
  # - :thumbnail_url
  # - :view_count
  # - :external_id
  # from response of external service
  # Response example:
  # {
  #   "videos": [
  #     {
  #       "id":1,
  #       "title": "thanks for 5 million",
  #       "video_id": "H1tQhK0n5Qk",
  #       "views": 279357,
  #       "likes": 66689,
  #       "comments":3144,
  #       "description": "#shorts",
  #       "thumbnail_url":"https://i.ytimg.com/vi/H1tQhK0n5Qk/default.jpg",
  #       "created_at":"2021-11-24T22:23:27.130Z",
  #       "updated_at":"2021-11-24T22:23:27.130Z"
  #     }
  #   ],
  #   "meta": {
  #     "total": 92,
  #     "page": 2
  #   }
  # }
  def self.videos(response)
    response['videos'].map do |v|
      {
        title: v['title'],
        description: v['description'],
        thumbnail_url: v['thumbnail_url'],
        view_count: v['views'],
        external_id: v['id']
      }
    end
  end

  def self.total(response)
    response['meta']['total']
  end
end