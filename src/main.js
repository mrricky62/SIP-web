import Vue from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import "@/plugins/vuetify-money";

import router from "./routes";
import store from "./store";

import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  styles: [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
  ],
};

Vue.use(VueHtmlToPaper, options);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
