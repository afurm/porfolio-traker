# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_transaction, mutation: Mutations::CreateTransaction
    field :update_transaction, mutation: Mutations::UpdateTransaction
    field :delete_transaction, mutation: Mutations::DeleteTransaction
    
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
