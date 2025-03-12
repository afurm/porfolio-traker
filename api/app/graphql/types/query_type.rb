# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :user_transactions, [Types::TransactionType], null: false,
      description: "Get all transactions for the current user" do
        argument :start_date, GraphQL::Types::ISO8601DateTime, required: false
        argument :end_date, GraphQL::Types::ISO8601DateTime, required: false
        argument :transaction_type, String, required: false
        argument :asset, String, required: false
    end

    def user_transactions(start_date: nil, end_date: nil, transaction_type: nil, asset: nil)
      # Ensure user is authenticated
      user = context[:current_user]
      raise GraphQL::ExecutionError, "You need to authenticate to access transactions" unless user

      # Start with all user transactions
      transactions = user.transactions

      # Apply filters if provided
      transactions = transactions.where("date >= ?", start_date) if start_date
      transactions = transactions.where("date <= ?", end_date) if end_date
      transactions = transactions.where(transaction_type: transaction_type) if transaction_type
      transactions = transactions.where(asset: asset) if asset

      transactions.order(date: :desc)
    end

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end
  end
end
