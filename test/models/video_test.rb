require "test_helper"

class VideoTest < ActiveSupport::TestCase
  context 'validations' do
    should validate_presence_of(:title)
  end
end
