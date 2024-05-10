class Video < ApplicationRecord
  # other fields might be empty
  validates :title, presence: true

  scope :search, -> (p) { where('videos.title LIKE ?', "%#{p}%") if p.present? }
end
