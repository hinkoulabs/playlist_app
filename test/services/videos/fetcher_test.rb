require "test_helper"

class Videos::FetcherTest < ActiveSupport::TestCase
  test 'call should return false if too many request are been processing' do
    Setting.stubs(:active_jobs_limit).returns(1)
    source = data_sources(:source)
    PageFetchJob.expects(:perform_later).never
    assert_no_difference("FetchRequest.count") do
      fetcher = Videos::Fetcher.new
      result = fetcher.call(source)
      assert_not result.status
      assert_equal "Workers are busy", result.error
    end
  end

  test 'call should return true if request has been already created' do
    Setting.stubs(:active_jobs_limit).returns(2)
    source = data_sources(:source_without_request)
    PageFetchJob.expects(:perform_later).with(instance_of(FetchRequest), Videos::Adapters::Default)
    assert_difference("FetchRequest.count") do
      fetcher = Videos::Fetcher.new
      result = fetcher.call(source)
      assert result.status
    end
  end
end
