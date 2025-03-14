module Types
  class TransactionType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :date, GraphQL::Types::ISO8601DateTime, null: false
    field :transaction_type, String, null: false
    field :asset, String, null: false
    field :amount, Float, null: false
    field :price, Float, null: false
    field :status, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :total_value, Float, null: false

    def total_value
      object.total_value
    end
  end
end 