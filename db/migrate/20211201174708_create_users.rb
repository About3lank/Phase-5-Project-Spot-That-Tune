class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :display_name
      t.string :email
      t.string :spotify_id
      t.string :uri

      t.timestamps
    end
  end
end
