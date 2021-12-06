class Song < ApplicationRecord
    has_many :tokens

    # validates :title, presence: true, allow_blank: true
    # validates :artist, presence: true, allow_blank: true
    # validates :tracks, presence: true, allow_blank: true
    # validates :imageUrl, presence: true, allow_blank: true
    # validates :uri, presence: true, allow_blank: true
end