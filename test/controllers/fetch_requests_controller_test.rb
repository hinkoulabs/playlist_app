require "test_helper"

class FetchRequestsControllerTest < ActionDispatch::IntegrationTest
  context 'create' do
    should "should get generate with success status" do
      stub_call_fetch_service(true)
      post fetch_requests_url
      assert_equal "Request has been created. Videos will be uploaded soon", flash[:notice]
      assert_redirected_to setting_url
    end

    should "should get generate with failure status" do
      stub_call_fetch_service(false, 'error')
      post fetch_requests_url
      assert_equal "Request has been rejected (error)", flash[:error]
      assert_redirected_to setting_url
    end

    should "should get generate.turbo_stream with success status" do
      stub_call_fetch_service(true)
      post fetch_requests_url(format: :turbo_stream)
      assert_equal "Request has been created. Videos will be uploaded soon", flash[:notice]
      assert_response :success
    end

    should "should get generate.turbo_stream with failure status" do
      stub_call_fetch_service(false, 'error1')
      post fetch_requests_url(format: :turbo_stream)
      assert_equal "Request has been rejected (error1)", flash[:error]
      assert_response 422
    end
  end

  context 'update' do
    should "should get generate with success status" do
      fetch_request = fetch_requests(:error)
      stub_restart_fetch_service(fetch_request, true)
      put fetch_request_url(fetch_request)
      assert_equal "Request will be processed soon", flash[:notice]
      assert_redirected_to fetch_requests_url
    end

    should "should get generate with failure status" do
      fetch_request = fetch_requests(:error)
      stub_restart_fetch_service(fetch_request, false, 'error')
      put fetch_request_url(fetch_request)
      assert_equal "Request has been rejected (error)", flash[:error]
      assert_redirected_to fetch_requests_url
    end

    should "should get generate.turbo_stream with success status" do
      fetch_request = fetch_requests(:error)
      stub_restart_fetch_service(fetch_request, true)
      put fetch_request_url(fetch_request, format: :turbo_stream)
      assert_equal "Request will be processed soon", flash[:notice]
      assert_response :success
    end

    should "should get generate.turbo_stream with failure status" do
      fetch_request = fetch_requests(:error)
      stub_restart_fetch_service(fetch_request, false, 'error1')
      put fetch_request_url(fetch_request, format: :turbo_stream)
      assert_equal "Request has been rejected (error1)", flash[:error]
      assert_response 422
    end
  end

  protected

  def stub_call_fetch_service(status, error = nil)
    res = OpenStruct.new(status: status, error: error)
    Videos::Fetcher.any_instance.expects(:call).with(data_sources(:source)).returns(res)
  end

  def stub_restart_fetch_service(fetch_request, status, error = nil)
    res = OpenStruct.new(status: status, error: error)
    Videos::Fetcher.any_instance.expects(:restart).with(fetch_request).returns(res)
  end
end
