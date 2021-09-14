class CreateLobbies < ActiveRecord::Migration[6.1]
  def change
    create_table :lobbies do |t|
      t.string :title
      t.integer :rank
      t.boolean :is_full

      t.timestamps
    end
  end
end
