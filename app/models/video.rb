class Video < ApplicationRecord
  belongs_to :data_source
  has_many :playlist_videos, dependent: :destroy
  has_many :playlists, through: :playlist_videos

  # other fields might be empty
  validates :title, presence: true

  scope :search, -> (p) { where('videos.title LIKE ?', "%#{p}%") if p.present? }
end
