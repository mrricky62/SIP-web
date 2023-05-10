import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const form = {
  nip: "",
  nama: "",
  pangkat: "",
  golongan: "",
  password: "",
  is_admin: false,
  is_active: false,
};

const pegawai = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    report: {},
    form: {
      ...form,
    },
    isUpdate: false,
  },
  mutations: {
    SET_IS_LOADING_PEGAWAI(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_PEGAWAI(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_PEGAWAI(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_PEGAWAI(state, payload) {
      state.report = payload;
    },
    SET_FORM_PEGAWAI(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_PEGAWAI(state) {
      state.form = {
        ...form,
      };
    },
    SET_IS_UPDATE_PEGAWAI(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async FetchPegawai(context) {
      context.commit("SET_IS_LOADING_PEGAWAI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/user`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });

        context.commit("SET_REPORTS_PEGAWAI", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PEGAWAI", false);
      }
    },
    async CreateUser(context) {
      context.commit("SET_IS_LOADING_PEGAWAI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/register`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("FetchPegawai");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PEGAWAI", false);
      }
    },
  },
};

export default pegawai;
