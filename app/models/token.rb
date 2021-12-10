class Token < ApplicationRecord
    belongs_to :user
    belongs_to :song
    belongs_to :game
end