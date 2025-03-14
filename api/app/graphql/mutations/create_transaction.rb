module Mutations
  class CreateTransaction < BaseMutation
    # Define the arguments
    argument :date, GraphQL::Types::ISO8601DateTime, required: true
    argument :transaction_type, String, required: true
    argument :asset, String, required: true
    argument :amount, Float, required: true
    argument :price, Float, required: true
    argument :status, String, required: true

    # Define the return fields
    field :transaction, Types::TransactionType, null: true
    field :errors, [String], null: false

    def resolve(date:, transaction_type:, asset:, amount:, price:, status:)
      # Ensure user is authenticated
      user = context[:current_user]
      raise GraphQL::ExecutionError, "You need to authenticate to create a transaction" unless user

      # Create the transaction
      transaction = user.transactions.build(
        date: date,
        transaction_type: transaction_type,
        asset: asset,
        amount: amount,
        price: price,
        status: status
      )

      if transaction.save
        {
          transaction: transaction,
          errors: []
        }
      else
        {
          transaction: nil,
          errors: transaction.errors.full_messages
        }
      end
    end
  end
end 