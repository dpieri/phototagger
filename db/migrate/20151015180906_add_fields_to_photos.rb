class AddFieldsToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :farm, :string
    add_column :photos, :server, :string
    add_column :photos, :secret, :string
  end
end
