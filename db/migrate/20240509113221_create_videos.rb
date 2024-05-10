class CreateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos do |t|
      t.string :title
      t.string :thumbnail_url
      t.text :description
      t.integer :view_count
      t.string :external_id
      t.string :url
      t.timestamps
    end
  end
end
