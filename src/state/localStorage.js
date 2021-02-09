import { currencies } from "../lib/currencies";

export const sortSettings = {
  initSortSettings() {
    if (!localStorage.getItem("sortSettings")) {
      localStorage.setItem(
        "sortSettings",
        JSON.stringify({
          sort: "by_time",
          duration: "all",
          currencyId: 0,
          type: "all",
          categories: [],
        }),
      );
    }
    return JSON.parse(localStorage.getItem("sortSettings"));
  },
  changeSortSettings(value) {
    localStorage.setItem("sortSettings", JSON.stringify(value));
  },
};

export const currencySettings = {
  initDefaultCurrency() {
    if (!localStorage.getItem("currency")) {
      localStorage.setItem("currency", JSON.stringify(currencies[0]));
    }
    return JSON.parse(localStorage.getItem("currency"));
  },
  changeDefaultCurrency(value) {
    localStorage.setItem("currency", JSON.stringify(value));
  },
};
