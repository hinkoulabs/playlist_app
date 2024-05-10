class Videos::Fetcher
  def initialize
    @adapter = Videos::Adapters::Default
  end

  def call(data_source, started_at = Time.current)
    process do
      FetchRequest.create(url: data_source.url, page: @adapter.default_page, created_at: started_at)
    end
  end

  def restart(fetch_request)
    process do
      fetch_request
    end
  end

  private

  def process
    if FetchRequest.active_count >= Setting.active_jobs_limit
      return OpenStruct.new(status: false, error: I18n.t("fetch_requests.limits.worker_limit"))
    end

    fetch_request = yield

    PageFetchJob.perform_later(fetch_request, @adapter)

    OpenStruct.new(status: true)
  end
end