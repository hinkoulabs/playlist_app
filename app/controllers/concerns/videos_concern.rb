module VideosConcern
  def get_videos(video_scope)
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    per_page = Video::PER_PAGE

    records = video_scope.search(params[:q])

    @videos = records.limit(per_page).offset((page - 1) * per_page)

    # meta data
    @total_count = records.count
    @total_pages = (@total_count.to_f / per_page).ceil
    @current_page = page
    @per_page = per_page
  end
end