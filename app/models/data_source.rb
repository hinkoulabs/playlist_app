class DataSource < ApplicationRecord
  has_many :fetch_requests, dependent: :destroy
  has_many :videos, dependent: :destroy

  validates :url, presence: true, uniqueness: true, format: { with: URI::regexp(%w(http https)) }

  class << self
    def instance
      DataSource.first || create(url: Setting.youtube_api)
    end
  end
end
