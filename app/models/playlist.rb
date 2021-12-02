class Playlist < ApplicationRecord
    validates :name, presence: true, allow_blank: true
    validates :description, presence: true, allow_blank: true
    validates :tracks, presence: true, allow_blank: true
    validates :imageUrl, presence: true, allow_blank: true
    validates :uri, presence: true, allow_blank: true
end
