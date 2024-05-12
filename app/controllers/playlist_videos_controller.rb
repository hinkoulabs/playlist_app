class PlaylistVideosController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :handler_error
  rescue_from ActionController::ParameterMissing, with: :handler_error

  before_action :find_playlist, only: [:update, :destroy]

  # the action is used:
  # 1. to create a new playlist and add videos to it or
  # 2. to add videos that are not assigned to the persisted playlist
  def create
    PlaylistVideo.transaction do
      if params[:id].present?
        find_playlist
      else
        @playlist = Playlist.new(playlist_params)
      end

      video_ids, start_position = if @playlist.persisted?
                                    [
                                      self.video_ids - @playlist.video_ids,
                                      @playlist.playlist_videos.maximum(:position) || 0
                                    ]
                                  else
                                    # raise ActiveRecord::RecordInvalid if record is invalid
                                    @playlist.save!
                                    [self.video_ids, 0]
                                  end

      update_positions(video_ids, start_position: start_position)
    end

    notice = t("flash.playlist_videos.create.success")

    respond_to do |format|
      format.html { redirect_to @playlist, notice: notice }
      format.json { render json: { message: notice } }
    end
  end

  # the action is used to reorder videos (:video_ids) inside selected playlist
  def update
    update_positions(self.video_ids)

    notice = t("flash.playlist_videos.update.success")

    respond_to do |format|
      format.html { redirect_to @playlist, notice: notice }
      format.json { render json: { message: notice } }
    end
  end

  # the action is used to bulk delete selected videos (:video_ids) from selected playlist
  def destroy
    PlaylistVideo.where(playlist_id: @playlist.id, video_id: self.video_ids).destroy_all

    notice = t("flash.playlist_videos.destroy.success")

    respond_to do |format|
      format.html { redirect_to @playlist, notice: notice }
      format.json { render json: { message: notice } }
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:name)
  end

  def video_ids
    params.require(:video_ids)
  end

  def find_playlist
    @playlist = Playlist.find(params[:id])
  end

  def handler_error(e)
    alert = t("flash.playlist_videos.error", reason: e.message)
    respond_to do |format|
      format.html { redirect_to root_path, alert: alert }
      format.json do
        response_body = { error: alert }
        if @playlist && @playlist.errors.present?
          response_body[:playlist] = @playlist.errors;
        end
        render json: response_body, status: :unprocessable_entity
      end
    end
  end

  def update_positions(video_ids, start_position: 0)
    persisted_ids = Video.where(id: video_ids).pluck(:id)
    attributes = (video_ids & persisted_ids).map.with_index do |video_id, index|
      {
        playlist_id: @playlist.id,
        video_id: video_id,
        position: start_position + 1 + index
      }
    end

    PlaylistVideo.upsert_all(attributes)
  end
end
