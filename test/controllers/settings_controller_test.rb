require "test_helper"

class SettingsControllerTest < ActionDispatch::IntegrationTest
  test "should index" do
    assert_no_difference("DataSource.count") do
      get setting_path
    end

    assert_response :success
  end
end
