import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

import dashboard from "./modules/dashboard";

import tunjangan from "./modules/tunjangan";
import pegawai from "./modules/pegawai";

export default new Vuex.Store({
  modules: {
    app,
    dashboard,
    tunjangan,
    pegawai,
  },
});
