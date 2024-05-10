class Video < ApplicationRecord
  # other fields might be empty
  validates :title, presence: true
end
