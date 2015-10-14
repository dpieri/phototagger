class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.float :x1
      t.float :y1
      t.float :x2
      t.float :y2
      t.references :user, index: true, foreign_key: true
      t.references :photo, index: true, foreign_key: true
      t.string :tag

      t.timestamps null: false
    end
  end
end
