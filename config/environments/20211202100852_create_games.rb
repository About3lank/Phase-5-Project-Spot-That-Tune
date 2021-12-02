class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :code
      t.references :playlists, index: true, foreign_key: true

      t.timestamps
    end
  end
end
