class AddExternalKeyIndexToVideos < ActiveRecord::Migration[7.1]
  def change
    add_index :videos, [:external_id, :url]
  end
end
