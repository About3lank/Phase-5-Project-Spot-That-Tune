class FixColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :games, :playlists_id, :playlist_id
  end
end
