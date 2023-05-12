import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

import dashboard from "./modules/dashboard";
import gaji from "./modules/gaji";
import tunjangan from "./modules/tunjangan";
import uangMakan from "./modules/uang-makan";
import spd from "./modules/spd";
import uangLembur from "./modules/uang-lembur";
import pegawai from "./modules/pegawai";

export default new Vuex.Store({
  modules: {
    app,
    dashboard,
    gaji,
    tunjangan,
    uangMakan,
    spd,
    uangLembur,
    pegawai,
  },
});
