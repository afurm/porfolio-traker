class Transaction < ApplicationRecord
  belongs_to :user
  
  validates :date, presence: true
  validates :transaction_type, presence: true, inclusion: { in: %w[buy sell] }
  validates :asset, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :status, presence: true, inclusion: { in: %w[pending completed failed] }
  
  # Calculate the total value of the transaction
  def total_value
    amount * price
  end
end
