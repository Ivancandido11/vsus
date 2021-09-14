class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.integer :lobby_id
      t.string :name
      t.integer :points
      t.string :password
      t.boolean :in_lobby

      t.timestamps
    end
  end
end
