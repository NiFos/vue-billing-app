<template>
  <div class="container flex px-4 py-3 mx-auto mb-2">
    <div class="flex w-full">
      <div class="flex items-center mr-2">
        <div class="p-2 mr-2 rounded-full bg-gray-50">
          <arrow-top-left
            v-if="transaction.income"
            fillColor="#10B981"
            :size="32"
          />
          <arrow-bottom-left v-else fillColor="#EF4444" :size="32" />
        </div>
      </div>
      <div class="w-full">
        <div>
          <div class="flex justify-between">
            <div class="flex">
              <div class="text-xl">{{ transaction.title }}</div>
              <div class="flex items-center ml-2 -mb-1">
                <span class="text-sm text-gray-300">{{ stringDate }}</span>
              </div>
            </div>
            <div
              class="text-xl"
              :class="transaction.income ? 'text-green-500' : 'text-red-500'"
            >
              {{ transaction.income ? "+" : "-"
              }}{{ convertAmount(transaction.amount) }}
              {{ transaction.currency.symbol }}
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="flex items-center">
            <div
              v-if="transaction.category"
              class="border-2 border-gray-50 text-gray-400 rounded-full inline p-0.5 px-1.5 text-sm -ml-2"
            >
              {{ transaction.category | convertCategory }}
            </div>
          </div>
          <div class="flex items-center">
            <trash-can-outline
              @click="remove"
              :size="22"
              class="text-gray-300 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import numeral from "numeral";
//import vDivider from "./v-divider.vue";
import { categoriesNames } from "../lib/categories";
import RemoveTransaction from "../state/graphql/mutations/RemoveTransaction.gql";
import ArrowBottomLeft from "vue-material-design-icons/ArrowBottomLeft.vue";
import ArrowTopLeft from "vue-material-design-icons/ArrowTopLeft.vue";
import TrashCanOutline from "vue-material-design-icons/TrashCanOutline.vue";
import gql from "graphql-tag";

export default {
  components: { ArrowBottomLeft, ArrowTopLeft, TrashCanOutline },
  props: {
    transaction: {
      id: Number,
      title: String,
      amount: Number,
      date: Number,
      currency: Object,
      income: Boolean,
      category: Number,
    },
  },
  data() {
    return {
      stringDate: moment(this.transaction.date).format("LT"),
    };
  },
  filters: {
    convertCategory(id) {
      return categoriesNames.get(id);
    },
  },
  methods: {
    remove() {
      this.$apollo.mutate({
        mutation: gql`
          ${RemoveTransaction}
        `,
        variables: {
          id: this.transaction.id,
        },
      });
    },
    convertAmount(value) {
      return numeral(value).format("0,0");
    },
  },
};
</script>
