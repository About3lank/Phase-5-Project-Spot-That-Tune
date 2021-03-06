class UserSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :email, :spotify_id, :uri, :account_name, :tokens
  
  def tokens
    ActiveModel::SerializableResource.new(object.tokens,  each_serializer: TokenSerializer)
  end
end