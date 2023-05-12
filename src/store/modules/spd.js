import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import moment from "moment/moment";
import Swal from "sweetalert2";

const form = {
  tanggal: moment().format("YYYY-MM"),
  tanggal_spm: moment().format("YYYY-MM-DD"),
  tujuan: "",
  sifat: "",
  uang_harian: "0",
  uang_transport: "0",
  uang_penginapan: "0",
  total: "0",
  lama: "0",
};

const spd = {
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
    SET_IS_LOADING_SPD(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_SPD(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_SPD(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_SPD(state, payload) {
      state.report = payload;
    },
    SET_FORM_SPD(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_SPD(state) {
      state.form = {
        ...form,
      };
    },
    SET_IS_UPDATE_SPD(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async FetchSPD(context) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/spd`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });

        context.commit("SET_REPORTS_SPD", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_SPD", false);
      }
    },
    async FetchSPDDetail(context, id) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/spd/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_SPD", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_SPD", false);
      }
    },
    async CreateSPD(context) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/spd`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });
        context.dispatch("FetchSPD");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_SPD", false);
      }
    },
    async SetFormUpdateSPD(context, id) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/spd/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        const data = result.data.data;
        context.state.form = {
          user_id: data.user_id,
          tanggal: data.tanggal,
          tanggal_spm: data.tanggal_spm,
          jam_kerja: data.jam_kerja,
          jam_libur: data.jam_libur,
          jam_makan: data.jam_makan,
          lembur: data.lembur,
          makan: data.makan,
          pph: data.pph,
          bersih: data.bersih,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_SPD", false);
      }
    },
    async UpdateSPD(context, id) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/spd/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });
        context.dispatch("FetchSPD");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_SPD", false);
      }
    },
    async DeleteSPD(context, id) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/spd/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });
        context.dispatch("FetchSPD");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_SPD", false);
      }
    },
  },
};

export default spd;
