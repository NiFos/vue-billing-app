<template>
  <div class="mt-2">
    <template v-if="transactions.length > 0">
      <div v-for="[date, transactions] of groupedTransactions" :key="date">
        <list-divider :date="date" />
        <div v-for="transaction of transactions" :key="transaction.id">
          <transaction :key="transaction.id" :transaction="transaction" />
        </div>
      </div>
    </template>
    <div v-else class="px-2 text-lg text-center">You have no transactions</div>
  </div>
</template>

<script>
import moment from "moment";
import transaction from "./transaction.vue";
import ListDivider from "./list-divider.vue";

export default {
  components: { transaction, ListDivider },
  props: {
    transactions: Array,
  },
  computed: {
    groupedTransactions() {
      const groups = this.transactions.reduce((acc, cur) => {
        const date = moment(cur.date).format("ll");
        const items = acc.get(date) || [];

        items.push(cur);
        acc.set(date, items);

        return acc;
      }, new Map());
      return Array.from(groups.entries());
    },
  },
};
</script>

<style></style>
