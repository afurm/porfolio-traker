module Mutations
  class DeleteTransaction < BaseMutation
    # Define the arguments
    argument :id, ID, required: true

    # Define the return fields
    field :success, Boolean, null: false
    field :errors, [String], null: false

    def resolve(id:)
      # Ensure user is authenticated
      user = context[:current_user]
      raise GraphQL::ExecutionError, "You need to authenticate to delete a transaction" unless user

      # Find the transaction
      transaction = user.transactions.find_by(id: id)
      
      if transaction.nil?
        return {
          success: false,
          errors: ["Transaction not found"]
        }
      end

      # Delete the transaction
      if transaction.destroy
        {
          success: true,
          errors: []
        }
      else
        {
          success: false,
          errors: transaction.errors.full_messages
        }
      end
    end
  end
end 