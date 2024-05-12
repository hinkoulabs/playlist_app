class AddUniqIndexToPlaylistVideos < ActiveRecord::Migration[7.1]
  def change
    add_index :playlist_videos, [:playlist_id, :video_id], unique: true
  end
end
