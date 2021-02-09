const durationInTimestamp = {
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
};

/**
 * @param data - source data
 * @param type - "all" || "income" || "expense"
 * @param duration - "all" || "week" || "month"
 * @param currencyId - currencyId || 0 - for disable
 */
export function filtering(
  transactions,
  type,
  duration,
  currencyId,
  categories,
) {
  let data = transactions;

  if (duration !== "all") {
    data = data.filter(
      x => x.date >= Date.now() - durationInTimestamp[duration],
    );
  }

  if (categories && categories.length > 0) {
    data = data.filter(x => x.category && categories.includes(x.category));
  }

  if (currencyId !== 0) {
    data = data.filter(x => x.currency.id === currencyId);
  }

  if (type !== "all") {
    data = data.filter(x => (type === "income" ? x.income : !x.income));
  }

  return data;
}

/**
 * @param {*} data - source data
 * @param {*} type - "by_time" || "by_amount"
 */
export function sort(data, type) {
  return [...data].sort((a, b) =>
    type === "by_time" ? b.date - a.date : b.amount - a.amount,
  );
}
