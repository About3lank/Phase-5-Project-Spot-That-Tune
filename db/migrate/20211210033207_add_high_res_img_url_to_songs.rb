class AddHighResImgUrlToSongs < ActiveRecord::Migration[6.1]
  def change
    add_column :songs, :high_res_img_url, :string
  end
end
