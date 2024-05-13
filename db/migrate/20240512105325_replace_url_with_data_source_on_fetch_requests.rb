class ReplaceUrlWithDataSourceOnFetchRequests < ActiveRecord::Migration[7.1]
  def change
    remove_column :fetch_requests, :url
    add_reference :fetch_requests, :data_source
  end
end
