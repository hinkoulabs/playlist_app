class Playlist < ApplicationRecord
  has_many :playlist_videos, -> { order(position: :asc) }, dependent: :destroy
  has_many :videos, through: :playlist_videos

  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
end
