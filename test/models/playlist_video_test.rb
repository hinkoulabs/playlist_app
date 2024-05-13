require "test_helper"

class PlaylistVideoTest < ActiveSupport::TestCase
  should belong_to(:playlist)
  should belong_to(:video)

  context 'validations' do
    # should validate_presence_of(:position)
    should validate_numericality_of(:position).only_integer.is_greater_than_or_equal_to(0)
  end
end
