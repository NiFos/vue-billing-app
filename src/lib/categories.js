const categories = [
  {
    id: 1,
    type: "income",
    name: "Salary",
  },
  {
    id: 2,
    type: "income",
    name: "Income correction",
  },
  {
    id: 3,
    type: "income",
    name: "Donation",
  },
  {
    id: 4,
    type: "expense",
    name: "Expense correction",
  },
  {
    id: 5,
    type: "expense",
    name: "Education",
  },
  {
    id: 6,
    type: "expense",
    name: "Entertainment",
  },
  {
    id: 7,
    type: "expense",
    name: "Health",
  },
  {
    id: 8,
    type: "expense",
    name: "Groceries",
  },
  {
    id: 9,
    type: "expense",
    name: "Kids",
  },
  {
    id: 10,
    type: "expense",
    name: "Transport",
  },
  {
    id: 11,
    type: "expense",
    name: "Shopping",
  },
  {
    id: 12,
    type: "expense",
    name: "Bills",
  },
  {
    id: 13,
    type: "expense",
    name: "Eating out",
  },
  {
    id: 14,
    type: "expense",
    name: "Gifts",
  },
];

export default categories;

export const categoriesNames = categories.reduce((acc, cur) => {
  acc.set(cur.id, cur.name);
  return acc;
}, new Map());
