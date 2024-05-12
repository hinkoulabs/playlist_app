class PlaylistsController < ApplicationController
  before_action :find_playlist, only: [:show, :edit, :update, :destroy]

  def index
    @pagy, @playlists = pagy(Playlist, items: 10)
  end

  def new
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      notice = t("flash.playlists.create.success")
      respond_to do |format|
        format.html { redirect_to @playlist, notice: notice }
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
  end

  def edit
  end

  def update
    if @playlist.update(playlist_params)
      notice = t("flash.playlists.update.success")
      respond_to do |format|
        format.html { redirect_to @playlist, notice: notice }
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @playlist.destroy
    respond_to do |format|
      format.html { redirect_to playlists_path, notice: t("flash.playlists.destroy.success") }
    end
  end

  private

  def find_playlist
    @playlist = Playlist.find(params[:id])
  end

  def playlist_params
    params.require(:playlist).permit(:name)
  end
end
