class User < ApplicationRecord
    has_many :tokens
    # has_many :games, through :tokens

    validates :account_name, presence: true
    validates :display_name, presence: true
    validates :email, presence: true, allow_blank: true
    validates :spotify_id, presence: true
    validates :uri, presence: true
end
