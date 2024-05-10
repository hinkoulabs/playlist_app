class PageFetchJob < ActiveJob::Base
  NEXT_PAGE_VALUES = [nil, 1].freeze

  def perform(fetch_request, adapter)
    return if fetch_request.done?

    fetch_request.update_attribute(:status, :processing)

    json_body = fetch_data(fetch_request, adapter)

    videos = adapter.videos(json_body)
    total = adapter.total(json_body)

    # save videos from the page
    b = Videos::Builder.new(fetch_request)
    b.call(videos)

    fetch_request.update(status: "done", finished_at: Time.current)

    process_next_pages(fetch_request, adapter, total, videos) if NEXT_PAGE_VALUES.include?(fetch_request.page)
  rescue => ex
    fetch_request.update(
      status: 'error',
      log: "#{ex.message}\n\r#{ex.backtrace.join("\n\t")}"
    )
  end

  protected

  def fetch_data(fetch_request, adapter)
    conn = Faraday.new(url: fetch_request.url) do |faraday|
      faraday.response :json
      faraday.adapter Faraday.default_adapter
    end

    params = {}

    params = adapter.page_params(fetch_request.page) if fetch_request.page

    # Fetch the first page to determine the total number of pages
    response = conn.get('', params)

    if response.body.is_a?(Hash)
      response.body
    else
      JSON.parse(response.body)
    end
  end

  def process_next_pages(fetch_request, adapter, total, videos)
    return unless videos.size > 0

    total_pages = (total.to_f / videos.size).ceil

    # Enqueue a job for each page
    (2..total_pages).each do |page|
      next_page_request = FetchRequest.create(url: fetch_request.url, page: page, created_at: Time.current)

      PageFetchJob.perform_later(next_page_request, adapter)
    end
  end
end
