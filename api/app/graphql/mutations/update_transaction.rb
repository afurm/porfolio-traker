module Mutations
  class UpdateTransaction < BaseMutation
    # Define the arguments
    argument :id, ID, required: true
    argument :date, GraphQL::Types::ISO8601DateTime, required: false
    argument :transaction_type, String, required: false
    argument :asset, String, required: false
    argument :amount, Float, required: false
    argument :price, Float, required: false
    argument :status, String, required: false

    # Define the return fields
    field :transaction, Types::TransactionType, null: true
    field :errors, [String], null: false

    def resolve(id:, **attributes)
      # Ensure user is authenticated
      user = context[:current_user]
      raise GraphQL::ExecutionError, "You need to authenticate to update a transaction" unless user

      # Find the transaction
      transaction = user.transactions.find_by(id: id)
      
      if transaction.nil?
        return {
          transaction: nil,
          errors: ["Transaction not found"]
        }
      end

      # Update the transaction
      if transaction.update(attributes)
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