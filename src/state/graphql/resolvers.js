import { persistor } from "../../vue-apollo";
import GetTransactions from "./queries/GetTransactions.gql";
import testData from "../../lib/testData";

export default {
  Mutation: {
    addTransaction: (_, args, { cache }) => {
      const { title, amount, currency, income, category } = args;
      const data = cache.readQuery({ query: GetTransactions });
      const lastItem = data?.transactions[data.transactions.length - 1];

      const transaction = {
        __typename: "Transaction",
        id: (lastItem?.id || 0) + 1,
        title,
        amount,
        date: Date.now(),
        currency,
        income,
        category: category ? category : 0,
      };

      data.transactions.push(transaction);

      cache.writeQuery({ query: GetTransactions, data });
      return transaction.id;
    },
    removeTransaction: (_, { id }, { cache }) => {
      const data = cache.readQuery({ query: GetTransactions });

      const index = data.transactions.findIndex(el => el.id === id);
      const removedTransaction = data.transactions.splice(index, 1);

      cache.writeQuery({ query: GetTransactions, data });

      return removedTransaction;
    },
    clearTransactions: async () => {
      await persistor.purge();
      return true;
    },
    loadTestTransactions: (_, args, { cache }) => {
      const data = cache.readQuery({ query: GetTransactions });
      data.transactions = data.transactions.concat(testData);
      cache.writeQuery({ query: GetTransactions, data });
      return true;
    },
  },
};
