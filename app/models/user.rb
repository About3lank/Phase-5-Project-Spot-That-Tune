class User < ApplicationRecord
    validates :account_name, presence: true, allow_blank: true
    validates :display_name, presence: true, allow_blank: true
    validates :email, presence: true, allow_blank: true
    validates :spotify_id, presence: true
    validates :uri, presence: true
end
