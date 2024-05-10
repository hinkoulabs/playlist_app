class DataSourcesController < ApplicationController
  before_action :data_source

  def edit
  end

  def update
    if data_source.update(data_source_params)
      notice = t("flash.data_source.update.success")
      respond_to do |format|
        format.html { redirect_to setting_path, notice: notice }
        format.turbo_stream { flash.now[:notice] = notice }
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def data_source_params
    params.require(:data_source).permit(:url, :proxy)
  end
end
