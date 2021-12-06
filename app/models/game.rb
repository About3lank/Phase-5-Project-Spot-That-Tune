class Game < ApplicationRecord
    belongs_to :playlist
    has_many :tokens
    has_many :users, through: :tokens

end
