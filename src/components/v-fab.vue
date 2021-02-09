<template>
  <div
    @click="toggle"
    class="fixed z-10 p-4 bg-red-400 rounded-full shadow-md cursor-pointer bottom-10 right-6"
  >
    <plus-icon :size="32" class="text-white" />
  </div>
</template>

<script>
import PlusIcon from "vue-material-design-icons/Plus.vue";

export default {
  components: {
    PlusIcon,
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
  },
};
</script>
