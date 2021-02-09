<template>
  <bottom-sheet v-model="dialog" title="Sort & filtering">
    <div class="text-lg">Sort</div>
    <div class="flex justify-between w-full mb-2">
      <button
        class="rounded-lg w-6/12 p-1.5"
        :class="sortSettings.sort === 'by_time' ? 'bg-red-400 text-white' : ''"
        @click="changeSortSettings('sort', 'by_time')"
      >
        By time
      </button>
      <button
        class="rounded-lg w-6/12 p-1.5"
        :class="sortSettings.sort === 'by_price' ? 'bg-red-400 text-white' : ''"
        @click="changeSortSettings('sort', 'by_price')"
      >
        By price
      </button>
    </div>
    <v-divider />

    <!-- Type -->
    <div class="text-lg">Type</div>
    <div class="flex justify-between w-full mb-2">
      <button
        class="rounded-lg w-4/12 p-1.5"
        :class="sortSettings.type === 'all' ? 'bg-red-400 text-white' : ''"
        @click="changeSortSettings('type', 'all')"
      >
        All
      </button>
      <button
        class="rounded-lg w-4/12 p-1.5 flex justify-around"
        :class="sortSettings.type === 'income' ? 'bg-red-400 text-white' : ''"
        @click="changeSortSettings('type', 'income')"
      >
        <div class="flex">
          <arrow-up />
          <span> Income </span>
        </div>
      </button>
      <button
        class="rounded-lg w-4/12 p-1.5 flex justify-around"
        :class="sortSettings.type === 'expense' ? 'bg-red-400 text-white' : ''"
        @click="changeSortSettings('type', 'expense')"
      >
        <div class="flex">
          <arrow-down />
          <span> Expense </span>
        </div>
      </button>
    </div>
    <v-divider />

    <!-- Time -->
    <div class="text-lg">Time</div>
    <div class="flex justify-between w-full mb-2">
      <button
        class="rounded-lg w-4/12 p-1.5"
        :class="sortSettings.duration === 'all' ? 'bg-red-400 text-white' : ''"
        @click="changeSortSettings('duration', 'all')"
      >
        All
      </button>
      <button
        class="rounded-lg w-4/12 p-1.5"
        :class="sortSettings.duration === 'week' ? 'bg-red-400 text-white' : ''"
        @click="changeSortSettings('duration', 'week')"
      >
        Week
      </button>
      <button
        class="rounded-lg w-4/12 p-1.5"
        :class="
          sortSettings.duration === 'month' ? 'bg-red-400 text-white' : ''
        "
        @click="changeSortSettings('duration', 'month')"
      >
        Month
      </button>
    </div>
    <v-divider />

    <!-- Currency -->
    <div class="text-lg">Currency</div>
    <div class="flex justify-between w-full mb-2">
      <button
        class="rounded-lg w-4/12 p-1.5"
        :class="sortSettings.currencyId === 0 ? 'bg-red-400 text-white' : ''"
        @click="changeSortSettings('currencyId', 0)"
      >
        All
      </button>
      <button
        class="rounded-lg w-2/12 p-1.5"
        v-for="currency in currencies"
        :key="currency.id"
        :class="
          sortSettings.currencyId === currency.id ? 'bg-red-400 text-white' : ''
        "
        @click="changeSortSettings('currencyId', currency.id)"
      >
        {{ currency.symbol }}
      </button>
    </div>
    <v-divider />

    <!-- Categories -->
    <div
      class="flex justify-between my-4 text-lg active:bg-gray-100"
      @click="toggleCategories = !toggleCategories"
    >
      <span>
        {{ currentTypeString }}
      </span>
      <chevron-down :class="toggleCategories ? 'btn-reverse' : ''" />
    </div>
    <transition name="list" mode="in-out">
      <v-categories
        v-if="toggleCategories"
        :allCategories="sortedCategories"
        :selectedCategories="sortSettings.categories"
        @toggleCategories="changeCategories"
      />
    </transition>
  </bottom-sheet>
</template>

<script>
import ArrowDown from "vue-material-design-icons/ArrowDown.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ArrowUp from "vue-material-design-icons/ArrowUp.vue";
import categories from "../lib/categories";
import VCategories from "./v-categories.vue";
import BottomSheet from "./bottom-sheet.vue";
import VDivider from "./v-divider.vue";

export default {
  components: {
    ArrowDown,
    ArrowUp,
    VCategories,
    BottomSheet,
    ChevronDown,
    VDivider,
  },
  props: {
    value: Boolean,
    currencies: Array,
    sortSettings: Object,
  },
  data() {
    return {
      categories,
      toggleCategories: false,
    };
  },
  methods: {
    changeSortSettings(name, value) {
      let newSortSettings = { ...this.sortSettings };
      if (name === "type") {
        newSortSettings.categories = [];
      }
      newSortSettings[name] = value;
      this.$emit("changeSortSettings", newSortSettings);
    },
    changeCategories(value) {
      if (value === 0) {
        this.changeSortSettings("categories", []);
      }
      const newCategories = [...this.sortSettings.categories];
      const index = newCategories.findIndex(el => el === value);
      if (index !== -1) {
        newCategories.splice(index, 1);
      } else {
        newCategories.push(value);
      }
      this.changeSortSettings("categories", newCategories);
    },
  },
  computed: {
    sortedCategories() {
      return this.sortSettings.type === "all"
        ? this.categories
        : this.categories.filter(el => el.type === this.sortSettings.type);
    },
    currentTypeString() {
      const types = {
        all: "Categories",
        income: "Income categories",
        expense: "Expense categories",
      };
      return types[this.sortSettings.type];
    },
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style>
.btn-reverse {
  transform: rotateX(180deg);
}
</style>

<style scoped>
.max-height {
  max-height: 30vh;
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
