<template>
  <div class="fixed w-screen px-4 py-3 bg-gray-100 inset-o">
    <div class="container flex items-center justify-between mx-auto">
      <div class="flex">
        <hamburger-icon
          @click="$emit('toggleMenu')"
          :size="28"
          class="cursor-pointer"
        />
        <div class="ml-2 text-2xl">Billing tracker</div>
      </div>
      <div target="_blank" @click="$emit('toggleSort')">
        <sort-icon :size="28" class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script>
import HamburgerIcon from "vue-material-design-icons/Hamburger.vue";
import SortIcon from "vue-material-design-icons/Sort.vue";

export default {
  components: { HamburgerIcon, SortIcon },
};
</script>
