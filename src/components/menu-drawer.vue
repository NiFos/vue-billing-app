<template>
  <bottom-sheet v-model="dialog" title="Hamburger menu" fullScreen>
    <div>
      <div class="flex items-center ml-1">
        <wallet-icon />
        <span class="my-2 ml-2 text-lg font-medium uppercase">Balance</span>
      </div>
      <div
        v-for="balance in balances"
        :key="balance.id"
        class="py-1 ml-1 mr-3 text-lg uppercase"
      >
        <div class="flex justify-between my-1">
          <span>
            {{ balance.name }}
          </span>
          <span class="text-lg">
            {{ balance.amount | formatNumber }} {{ balance.symbol }}
          </span>
        </div>
        <v-divider class="bg-gray-50" />
      </div>
      <div class="flex items-center ml-1">
        <cog-outline />
        <span class="my-2 ml-2 text-lg font-medium uppercase">Settings</span>
      </div>
      <div class="flex justify-between my-2 ml-1 mr-3 text-lg">
        <span>Default currency:</span>
        <select v-model="currentCurrency" class="bg-transparent">
          <option
            v-for="currency in currencies"
            :key="currency.id"
            :value="currency"
          >
            {{ currency.name + " (" + currency.symbol + ")" }}
          </option>
        </select>
      </div>
      <v-divider class="ml-1 mr-3 bg-gray-50" />
    </div>
    <div>
      <button
        class="w-full p-2 mt-10 text-lg text-white bg-blue-400 rounded-lg"
        @click="loadTestData"
      >
        Load test data
      </button>
      <button
        class="w-full p-2 mt-3 text-lg text-white bg-red-400 rounded-lg"
        @click="clearData"
      >
        Clear data
      </button>
    </div>
  </bottom-sheet>
</template>

<script>
import WalletIcon from "vue-material-design-icons/Wallet.vue";
import CogOutline from "vue-material-design-icons/CogOutline.vue";
import { currencies } from "../lib/currencies";
import VDivider from "./v-divider.vue";
import BottomSheet from "./bottom-sheet.vue";
import numeral from "numeral";
import gql from "graphql-tag";
import ClearTransactions from "../state/graphql/mutations/ClearTransactions.gql";
import LoadTestTransactions from "../state/graphql/mutations/LoadTestTransactions.gql";

export default {
  components: {
    WalletIcon,
    CogOutline,
    VDivider,
    BottomSheet,
  },
  props: {
    value: Boolean,
    balances: Array,
    currency: Object,
  },
  data() {
    return {
      currencies,
    };
  },
  filters: {
    formatNumber(value) {
      return numeral(value).format("0,0");
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    currentCurrency: {
      get() {
        return this.currency;
      },
      set(val) {
        this.$emit("changeCurrency", val);
      },
    },
  },
  methods: {
    async loadTestData() {
      await this.$apollo.mutate({
        mutation: gql`
          ${LoadTestTransactions}
        `,
      });
      alert("Test data was loaded!");
    },
    async clearData() {
      await this.$apollo.mutate({
        mutation: gql`
          ${ClearTransactions}
        `,
      });
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.drawer-container {
  height: 100%;
}
.btn {
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
