class PlaylistVideo < ApplicationRecord
  belongs_to :playlist
  belongs_to :video

  scope :ordered, -> { order(position: :asc) }

  validates :position, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
