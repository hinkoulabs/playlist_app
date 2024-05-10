class VideosController < ApplicationController
  PER_PAGE = 20
  def index
    page = params[:page].to_i > 0 ? params[:page].to_i : 1

    records = Video.search(params[:q])

    @videos = records.limit(PER_PAGE).offset((page - 1) * PER_PAGE)

    # meta data
    @total_count = records.count
    @total_pages = (@total_count.to_f / PER_PAGE).ceil
    @current_page = page
    @per_page = PER_PAGE
  end
end