<template>
  <div class="flex items-center justify-between p-2 text-center">
    <v-divider class="w-full bg-gray-50 h-0.5" />
    <span class="flex-auto w-full text-gray-300">
      {{ date }}
    </span>
    <v-divider class="w-full bg-gray-50 h-0.5" />
  </div>
</template>

<script>
import VDivider from "./v-divider.vue";

export default {
  components: { VDivider },
  props: {
    date: String,
  },
};
</script>
