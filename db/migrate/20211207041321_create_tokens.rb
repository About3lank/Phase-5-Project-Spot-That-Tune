class CreateTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens do |t|
      t.references :user, index: true, foreign_key: true
      t.references :game, index: true, foreign_key: true
      t.references :song, index: true, foreign_key: true


      t.timestamps
    end
  end
end
