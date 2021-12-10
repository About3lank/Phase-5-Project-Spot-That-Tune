class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :image_url, :high_res_img_url, :uri, :spotify_id
end
