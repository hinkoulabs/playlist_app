class ApplicationController < ActionController::Base
  include Pagy::Backend

  before_action :authenticate, if: -> { Rails.env.production? }

  helper_method :data_source

  def data_source
    @data_source ||= DataSource.instance
  end

  def current_fetch_request
    @fetch_request ||= FetchRequest.current
  end

  private

  # it's used to restrict access with creds on production servers.
  # it's because the application will be delivered to live it's required to add it.
  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == Rails.application.credentials.dig(:username) &&
        password == Rails.application.credentials.dig(:password)
    end
  end
end
