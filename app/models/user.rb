class User < ApplicationRecord
    validates :display_name, presence: true, allow_blank: true
    validates :email, presence: true, allow_blank: true
    validates :spotify_id, uniqueness: true
    validates :uri, presence: true
end
