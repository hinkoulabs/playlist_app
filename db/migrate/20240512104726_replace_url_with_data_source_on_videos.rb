class ReplaceUrlWithDataSourceOnVideos < ActiveRecord::Migration[7.1]
  def change
    remove_column :videos, :url
    add_reference :videos, :data_source
    add_index :videos, [:external_id, :data_source_id], unique: true
  end
end
