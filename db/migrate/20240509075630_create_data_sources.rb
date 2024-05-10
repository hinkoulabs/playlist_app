class CreateDataSources < ActiveRecord::Migration[7.1]
  def change
    create_table :data_sources do |t|
      t.string :url
      t.boolean :proxy
      t.timestamps
    end

    add_index :data_sources, :url, unique: true
  end
end
