class CreatePlaylistVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :playlist_videos do |t|
      t.references :playlist
      t.references :video
      t.integer :position

      t.timestamps
    end
  end
end
