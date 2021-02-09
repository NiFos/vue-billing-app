<template>
  <div>
    <v-header
      @toggleMenu="menuDrawer = !menuDrawer"
      @toggleSort="sortDrawer = !sortDrawer"
    />
    <new-transaction :defaultCurrency="currency" />
    <menu-drawer
      v-model="menuDrawer"
      :balances="balances"
      :currency="currency"
      @changeCurrency="changeCurrency"
    />
    <sort
      v-model="sortDrawer"
      :sortSettings="sortSettings"
      :currencies="currencies"
      @changeSortSettings="changeSortSettings"
    />
    <div class="pt-14">
      <list :transactions="transactions" />
    </div>
  </div>
</template>

<script>
import MenuDrawer from "./components/menu-drawer.vue";
import NewTransaction from "./components/new-transaction.vue";
import List from "./components/list.vue";
import Sort from "./components/sort.vue";
import VHeader from "./components/v-header.vue";
import { balancesCount, currencies } from "./lib/currencies";
import { filtering, sort } from "./lib/sortAndFiltering";
import GetTransactions from "./state/graphql/queries/GetTransactions.gql";
import { currencySettings, sortSettings } from "./state/localStorage";
import gql from "graphql-tag";

export default {
  name: "App",
  components: {
    VHeader,
    List,
    Sort,
    NewTransaction,
    MenuDrawer,
  },
  apollo: {
    transactionsData: {
      query: gql`
        ${GetTransactions}
      `,
      loadingKey: "loading",
      update: data =>
        data.transactions.map(item => ({
          ...item,
          currency: JSON.parse(item.currency),
        })),
    },
  },
  mounted() {
    this.sortSettings = sortSettings.initSortSettings();
    this.currency = currencySettings.initDefaultCurrency();
  },
  data: () => ({
    menuDrawer: false,
    sortDrawer: false,
    sortSettings: {},
    currency: currencies[0],
    currencies,
  }),
  computed: {
    transactions() {
      const { type, duration, currencyId, categories } = this.sortSettings;
      const filteredData = filtering(
        this.transactionsData,
        type,
        duration,
        currencyId,
        categories,
      );
      const sortedData = sort(filteredData, this.sortSettings.sort);
      return sortedData;
    },
    balances() {
      return balancesCount(this.transactionsData);
    },
  },
  methods: {
    changeSortSettings(val) {
      this.sortSettings = val;
      sortSettings.changeSortSettings(this.sortSettings);
    },
    changeCurrency(val) {
      this.currency = val;
      currencySettings.changeDefaultCurrency(this.currency);
    },
  },
};
</script>

<style></style>
