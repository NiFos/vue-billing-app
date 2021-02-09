import gql from "graphql-tag";

export default gql`
  type Mutation {
    removeTransaction(id: Int!): Int
    addTransaction(
      title: String!
      amount: Int!
      currency: String!
      income: Boolean!
      category: Int!
    ): Int
    clearTransactions: Boolean
  }
  type Subscription {
    transactions: Transaction
  }
  type Transaction {
    id: Int
    title: String
    amount: Int
    date: Int
    currency: String
    income: Boolean
    category: Int
  }
`;
