class TokenSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :song_id, :game_id, :created_at
  belongs_to :song
  # belongs_to :game
  def songs
    ActiveModel::SerializableResource.new(object.songs,  each_serializer: SongSerializer)
  end
end
