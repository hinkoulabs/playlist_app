module FetchRequestsHelper
  def request_status_badge(value)
    color_class = {
      'processing' => 'text-bg-secondary',
      'done' => 'text-bg-success',
      'error' => 'text-bg-danger'
    }[value]

    badge(t("fetch_requests.statuses.#{value}"), color_class, uppercase: true)
  end
end