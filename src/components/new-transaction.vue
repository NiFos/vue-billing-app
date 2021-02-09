<template>
  <div>
    <v-fab @toggle="drawer = !drawer" />
    <bottom-sheet title="Add new transaction" v-model="drawer">
      <div class="flex justify-between w-full my-2">
        <button
          class="rounded-lg w-6/12 p-1.5 flex text-center justify-around"
          :class="income ? 'bg-red-400 text-white' : ''"
          @click="changeType(true)"
        >
          <div class="flex">
            <arrow-up />
            <span>Income</span>
          </div>
        </button>
        <button
          class="rounded-lg w-6/12 p-1.5 flex justify-around"
          :class="income ? '' : 'bg-red-400 text-white'"
          @click="changeType(false)"
        >
          <div class="flex">
            <arrow-down />
            <span>Expense</span>
          </div>
        </button>
      </div>
      <div class="my-1">
        <input
          class="block w-full p-2 mb-2 border-l-4 border-gray-200"
          placeholder="Title"
          v-model="title"
        />
        <input
          class="block w-full p-2 border-l-4 border-gray-200"
          :placeholder="'Amount' + ' ' + currency.symbol"
          v-model.number="amount"
          type="number"
        />
      </div>
      <v-divider class="my-4" />
      <div class="flex justify-between text-lg">
        <span>Currency</span>
        <select v-model="currency" class="bg-transparent">
          <option
            v-for="currency in currencies"
            :key="currency.id"
            :value="currency"
          >
            {{ currency.name + " (" + currency.symbol + ")" }}
          </option>
        </select>
      </div>
      <div>
        <div
          class="flex justify-between my-4 text-base text-lg active:bg-gray-100"
          @click="toggleCategories = !toggleCategories"
        >
          <span>Category</span>
          <chevron-down :class="toggleCategories ? 'btn-reverse' : ''" />
        </div>
        <transition name="list" mode="in-out">
          <v-categories
            v-if="toggleCategories"
            onlyOne
            :selectedCategory="category"
            :allCategories="categories"
            @toggleCategory="changeCategory"
          />
        </transition>
      </div>
      <button
        @click="submit"
        class="w-full p-2 mt-8 text-white bg-red-400 rounded-lg"
      >
        Submit
      </button>
    </bottom-sheet>
  </div>
</template>

<script>
import ArrowDown from "vue-material-design-icons/ArrowDown.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ArrowUp from "vue-material-design-icons/ArrowUp.vue";
import { currencies } from "../lib/currencies";
import categories from "../lib/categories";
import VCategories from "./v-categories.vue";
import BottomSheet from "./bottom-sheet.vue";
import vDivider from "./v-divider.vue";
import VFab from "./v-fab.vue";
import AddTransaction from "../state/graphql/mutations/AddTransaction.gql";
import gql from "graphql-tag";

export default {
  props: {
    defaultCurrency: Object,
  },
  data() {
    return {
      drawer: false,
      title: "",
      amount: null,
      currency: this.defaultCurrency,
      income: false,
      category: 0,
      currencies,
      toggleCategories: false,
    };
  },
  components: {
    VFab,
    ArrowDown,
    ChevronDown,
    ArrowUp,
    VCategories,
    BottomSheet,
    vDivider,
  },
  watch: {
    defaultCurrency(value) {
      this.currency = value;
    },
  },
  computed: {
    categories() {
      return this.income
        ? categories.filter(el => el.type === "income")
        : categories.filter(el => el.type === "expense");
    },
  },
  methods: {
    changeType(value) {
      this.income = value;
      this.categoryId = 0;
    },
    changeCategory(value) {
      if (this.category === value) {
        this.category = 0;
      } else {
        this.category = value;
      }
    },
    submit() {
      this.$apollo.mutate({
        mutation: gql`
          ${AddTransaction}
        `,
        variables: {
          title: this.title,
          amount: this.amount,
          currency: JSON.stringify(this.currency),
          income: this.income,
          category: this.category,
        },
      });
      this.drawer = false;
      this.title = "";
      this.amount = null;
      this.income = false;
      this.currency = this.defaultCurrency;
      this.categoryId = 0;
    },
  },
};
</script>
