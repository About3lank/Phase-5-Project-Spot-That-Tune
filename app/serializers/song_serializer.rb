class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :image_url, :uri, :spotify_id
end
