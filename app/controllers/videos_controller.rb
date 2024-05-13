class VideosController < ApplicationController
  include VideosConcern

  def index
    get_videos(Video)
  end
end