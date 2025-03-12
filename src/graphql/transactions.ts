import { gql } from '@apollo/client';

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions(
    $startDate: ISO8601DateTime
    $endDate: ISO8601DateTime
    $transactionType: String
    $asset: String
  ) {
    userTransactions(
      startDate: $startDate
      endDate: $endDate
      transactionType: $transactionType
      asset: $asset
    ) {
      id
      date
      transactionType
      asset
      amount
      price
      totalValue
      status
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $date: ISO8601DateTime!
    $transactionType: String!
    $asset: String!
    $amount: Float!
    $price: Float!
    $status: String!
  ) {
    createTransaction(
      input: {
        date: $date
        transactionType: $transactionType
        asset: $asset
        amount: $amount
        price: $price
        status: $status
      }
    ) {
      transaction {
        id
        date
        transactionType
        asset
        amount
        price
        totalValue
        status
      }
      errors
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $date: ISO8601DateTime
    $transactionType: String
    $asset: String
    $amount: Float
    $price: Float
    $status: String
  ) {
    updateTransaction(
      input: {
        id: $id
        date: $date
        transactionType: $transactionType
        asset: $asset
        amount: $amount
        price: $price
        status: $status
      }
    ) {
      transaction {
        id
        date
        transactionType
        asset
        amount
        price
        totalValue
        status
      }
      errors
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      success
      errors
    }
  }
`;
