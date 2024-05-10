require "test_helper"

class SettingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    assert_no_difference("DataSource.count") do
      get setting_path
      assert_response :success
    end
  end
end
