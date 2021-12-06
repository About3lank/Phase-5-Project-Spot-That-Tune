class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :image_url
      t.string :uri
      t.string :spotify_id

      t.timestamps
    end
  end
end
