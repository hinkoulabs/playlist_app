# RailsSettings Model
class Setting < RailsSettings::Base
  cache_prefix { "v1" }

  scope :application do
    field :youtube_api, default: "https://mock-youtube-api-f3d0c17f0e38.herokuapp.com/api/videos", validates: { format: { with: URI.regexp } }

    scope :developer do
      field :dev_name, default: "Hinkou Labs"
      field :dev_url, default: "https://hinkoulabs.com/"
    end

    scope :jobs do
      field :active_jobs_limit, type: :integer, default: 100
    end

    scope :pagination do
      field :video_per_page, type: :integer, default: 20
    end
  end
end
