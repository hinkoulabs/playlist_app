require "test_helper"

class DataSourcesControllerTest < ActionDispatch::IntegrationTest
  test "should edit" do
    assert_no_difference("DataSource.count") do
      get edit_data_source_url
    end

    assert_response :success
  end

  test "should update" do
    assert_no_difference("DataSource.count") do
      patch data_source_url, params: { data_source: valid_params  }
    end

    assert_equal "Data source was successfully updated", flash[:notice]
    assert_redirected_to setting_url
    source = DataSource.first
    valid_params.each do |attr, value|
      assert_equal value, source.try(attr), value
    end
  end

  test "should update with invalid data" do
    assert_no_difference("DataSource.count") do
      patch data_source_url, params: { data_source: invalid_params }
    end

    assert_response :unprocessable_entity
    source = DataSource.first
    invalid_params.each do |attr, value|
      assert_not_equal value, source.try(attr), value
    end
  end

  test "should update.turbo_stream" do
    assert_no_difference("DataSource.count") do
      patch data_source_url(format: :turbo_stream), params: { data_source: valid_params  }
    end

    assert_equal "Data source was successfully updated", flash[:notice]
    assert_response :success
    source = DataSource.first
    valid_params.each do |attr, value|
      assert_equal value, source.try(attr), value
    end
  end

  test "should update.turbo_stream with invalid data" do
    assert_no_difference("DataSource.count") do
      patch data_source_url(format: :turbo_stream), params: { data_source: invalid_params }
    end

    assert_response :unprocessable_entity
    source = DataSource.first
    invalid_params.each do |attr, value|
      assert_not_equal value, source.try(attr), value
    end
  end

  protected

  def invalid_params
    {
      url: ''
    }
  end

  def valid_params
    {
      url: "http://some_new_url.com/videos"
    }
  end
end
