class Token < ApplicationRecord
    belongs_to :user
    belongs_to :song
    belongs_to :game

    # validates :title, presence: true, allow_blank: true
    # validates :artist, presence: true, allow_blank: true
    # validates :tracks, presence: true, allow_blank: true
    # validates :imageUrl, presence: true, allow_blank: true
    # validates :uri, presence: true, allow_blank: true
end