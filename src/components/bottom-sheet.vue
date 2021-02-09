<template>
  <transition name="list" mode="in-out">
    <div
      v-show="drawer"
      class="fixed inset-0 z-20 h-full bg-gray-500 bg-opacity-25"
      @click="clickOutside"
    >
      <div
        class="fixed bottom-0 left-0 right-0 max-h-screen bg-white shadow-2xl rounded-2xl"
        :class="fullScreen ? 'h-full' : ''"
      >
        <div class="container max-h-full py-4 mx-auto">
          <div class="px-4 header">
            <div class="text-2xl">
              {{ title }}
            </div>
            <div
              class="flex items-center cursor-pointer"
              @click="drawer = false"
            >
              <span class="text-lg font-medium uppercase">Close</span>
              <close-icon :size="28" />
            </div>
          </div>
          <v-divider />
          <div
            class="px-4 overflow-auto content max-height"
            :class="fullScreen ? 'full-screen' : ''"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CloseIcon from "vue-material-design-icons/Close.vue";
import vDivider from "./v-divider.vue";

export default {
  components: { vDivider, CloseIcon },
  props: {
    title: String,
    value: Boolean,
    fullScreen: Boolean,
  },
  computed: {
    drawer: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  watch: {
    value() {
      // Change system status bar color (on mobile) when bottom-sheet is open
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      metaThemeColor.setAttribute(
        "content",
        this.value ? "#D1D5DB" : "#F3F4F6",
      );
    },
  },
  methods: {
    clickOutside(e) {
      if (e.target === e.currentTarget) {
        this.drawer = false;
      }
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.max-height {
  max-height: 87vh;
}
.full-screen {
  height: 85vh;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bottom-sheet {
  transition: all 0.3s;
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
