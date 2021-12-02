class CreatePlaylists < ActiveRecord::Migration[6.1]
  def change
    create_table :playlists do |t|
      t.string :name
      t.string :description
      t.string :imageUrl
      t.string :tracks
      t.string :uri

      t.timestamps
    end
  end
end
