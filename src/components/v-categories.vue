<template>
  <div class="flex flex-col w-full">
    <button
      class="w-full px-1.5 py-2 text-base border-b-2"
      v-for="category in categories"
      :key="category.id"
      :class="category.includes ? 'bg-red-400 text-white rounded-lg' : ''"
      @click="toggleCategory(category.id)"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    onlyOne: Boolean,
    allCategories: Array,
    selectedCategories: Array,
    selectedCategory: Number,
  },
  computed: {
    categories() {
      return this.allCategories.map(item => ({
        ...item,
        includes: this.includes(item.id),
      }));
    },
  },
  methods: {
    includes(id) {
      if (this.onlyOne) {
        return this.selectedCategory === id;
      } else {
        return this.selectedCategories.includes(id);
      }
    },
    toggleCategory(id) {
      if (this.onlyOne) {
        this.$emit("toggleCategory", id);
      } else {
        this.$emit("toggleCategories", id);
      }
    },
  },
};
</script>
