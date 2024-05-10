class FetchRequestsController < ApplicationController
  def index
    @pagy, @fetch_requests = pagy(FetchRequest.latest, items: 10)
  end

  def create
    fetcher = Videos::Fetcher.new

    result = fetcher.call(data_source)

    if result.status
      notice = t("flash.fetch_requests.create.success")
      respond_to do |format|
        format.html { redirect_to setting_path, notice: notice }
        format.turbo_stream { flash.now[:notice] = notice }
      end
    else
      error = t("flash.fetch_requests.create.error", reason: result.error)
      respond_to do |format|
        format.html { redirect_to setting_path, flash: { error: error } }
        format.turbo_stream do
          flash.now[:error] = error
          render :create, status: :unprocessable_entity
        end
      end
    end
  end

  def update
    fetch_request = FetchRequest.find(params[:id])

    fetcher = Videos::Fetcher.new

    result = fetcher.restart(fetch_request)

    if result.status
      notice = t("flash.fetch_requests.update.success")
      respond_to do |format|
        format.html { redirect_to fetch_requests_path, notice: notice }
        format.turbo_stream { flash.now[:notice] = notice }
      end
    else
      error = t("flash.fetch_requests.update.error", reason: result.error)
      respond_to do |format|
        format.html { redirect_to fetch_requests_path, flash: { error: error } }
        format.turbo_stream do
          flash.now[:error] = error
          render :create, status: :unprocessable_entity
        end
      end
    end
  end
end