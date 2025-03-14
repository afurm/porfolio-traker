class AddDecimalPrecisionToTransactions < ActiveRecord::Migration[8.0]
  def change
    change_column :transactions, :amount, :decimal, precision: 20, scale: 8
    change_column :transactions, :price, :decimal, precision: 20, scale: 8
  end
end
