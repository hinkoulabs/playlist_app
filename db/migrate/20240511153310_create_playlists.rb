class CreatePlaylists < ActiveRecord::Migration[7.1]
  def change
    create_table :playlists do |t|
      t.string :name

      t.timestamps
    end

    add_index :playlists, :name, unique: true
  end
end
