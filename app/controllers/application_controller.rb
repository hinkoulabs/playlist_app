class ApplicationController < ActionController::Base
  include Pagy::Backend

  helper_method :data_source

  def data_source
    @data_source ||= DataSource.instance
  end

  def current_fetch_request
    @fetch_request ||= FetchRequest.current
  end
end
