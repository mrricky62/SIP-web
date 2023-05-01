import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

import dashboard from "./modules/dashboard";

import tunjangan from "./modules/tunjangan";

export default new Vuex.Store({
  modules: {
    app,
    dashboard,
    tunjangan,
  },
});
