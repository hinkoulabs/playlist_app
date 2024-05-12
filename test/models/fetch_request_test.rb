require "test_helper"

class FetchRequestTest < ActiveSupport::TestCase
  should belong_to(:data_source)
end
