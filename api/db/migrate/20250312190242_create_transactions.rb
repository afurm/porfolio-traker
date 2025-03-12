class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.datetime :date
      t.string :transaction_type
      t.string :asset
      t.decimal :amount
      t.decimal :price
      t.string :status

      t.timestamps
    end
  end
end
