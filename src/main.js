import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { apolloProvider, waitPersistCache } from "./vue-apollo";
import "./assets/tailwind.css";

Vue.config.productionTip = false;

waitPersistCache().then(() => {
  new Vue({
    apolloProvider,
    render: h => h(App),
  }).$mount("#app");
});
