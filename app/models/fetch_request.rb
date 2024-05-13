class FetchRequest < ApplicationRecord
  enum status: %w(processing done error)

  belongs_to :data_source

  scope :latest, -> { order(id: :desc) }
  scope :active, -> { where(status: 'processing') }

  class << self
    def active_count
      active.count
    end
  end
end
