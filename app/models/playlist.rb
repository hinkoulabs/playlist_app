class Playlist < ApplicationRecord
  has_many :playlist_videos, -> { ordered }, dependent: :destroy
  has_many :videos, through: :playlist_videos

  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }

  scope :order_by_name, -> { order(name: :asc)}
end
