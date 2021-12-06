class Createtokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens do |t|
      t.string :title
      t.string :artist
      t.string :imageUrl
      t.references :users, index: true, foreign_key: true
      t.references :games, index: true, foreign_key: true

      t.timestamps
    end
  end
end
