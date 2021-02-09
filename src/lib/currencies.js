export const currencies = [
  { id: 1, name: "USD", symbol: "$" },
  { id: 2, name: "UAH", symbol: "₴" },
  { id: 3, name: "RUB", symbol: "₽" },
  { id: 4, name: "EUR", symbol: "€" },
];

const sumBalance = (transactions, currencyId) => {
  return transactions.reduce((acc, cur) => {
    return cur.currency.id === currencyId ? acc + cur.amount : acc;
  }, 0);
};

export function balancesCount(transactions) {
  return currencies.map(currency => {
    const all = sumBalance(transactions, currency.id);

    const incomeTransactions = transactions.filter(x => x.income);
    const income = sumBalance(incomeTransactions, currency.id);

    const expense = all - income;
    const amount = income - expense;

    return { ...currency, amount };
  });
}
