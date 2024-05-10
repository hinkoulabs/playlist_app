require "test_helper"

class DataSourcesControllerTest < ActionDispatch::IntegrationTest
  test "should get edit" do
    assert_no_difference("DataSource.count") do
      get edit_data_source_url
      assert_response :success
    end
  end

  test "should put update" do
    assert_no_difference("DataSource.count") do
      put data_source_url, params: { data_source: valid_params  }
      assert_equal "Data source was successfully updated", flash[:notice]
      assert_redirected_to setting_url
    end
    source = DataSource.first
    valid_params.each do |attr, value|
      assert_equal value, source.try(attr), value
    end
  end

  test "should put update with invalid data" do
    assert_no_difference("DataSource.count") do
      put data_source_url, params: { data_source: invalid_params }
      assert_response 422
    end
    source = DataSource.first
    invalid_params.each do |attr, value|
      assert_not_equal value, source.try(attr), value
    end
  end

  test "should put update.turbo_stream" do
    assert_no_difference("DataSource.count") do
      put data_source_url(format: :turbo_stream), params: { data_source: valid_params  }
      assert_equal "Data source was successfully updated", flash[:notice]
      assert_response :success
    end
    source = DataSource.first
    valid_params.each do |attr, value|
      assert_equal value, source.try(attr), value
    end
  end

  test "should put update.turbo_stream with invalid data" do
    assert_no_difference("DataSource.count") do
      put data_source_url(format: :turbo_stream), params: { data_source: invalid_params }
      assert_response 422
    end
    source = DataSource.first
    invalid_params.each do |attr, value|
      assert_not_equal value, source.try(attr), value
    end
  end

  protected

  def invalid_params
    {
      url: '',
      proxy: true
    }
  end

  def valid_params
    {
      url: "http://some_new_url.com/videos",
      proxy: true
    }
  end
end
