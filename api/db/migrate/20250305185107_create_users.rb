class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :provider
      t.string :provider_id
      t.string :image
      t.string :password_digest

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
