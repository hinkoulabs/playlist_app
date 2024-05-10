class CreateFetchRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :fetch_requests do |t|
      t.integer :status, default: 0
      t.datetime :finished_at
      t.string :url
      t.text :log
      t.integer :page
      t.timestamps
    end
  end
end
