import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import moment from "moment/moment";
import Swal from "sweetalert2";

const form = {
  user_id: "",
  tanggal: moment().format("YYYY-MM"),
  tanggal_spm: moment().format("YYYY-MM-DD"),
  kdgol: "",

  jml_hari: 0,
  tarif: "0",
  kotor: "0",
  pph: "0",
  bersih: "0",

  no_rek: "",
};

const uangMakan = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    report: {},
    list_pegawai: [],
    form: {
      ...form,
    },
    isUpdate: false,
  },
  mutations: {
    SET_IS_LOADING_UANG_MAKAN(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_UANG_MAKAN(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_UANG_MAKAN(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_UANG_MAKAN(state, payload) {
      state.report = payload;
    },
    SET_LIST_PEGAWAI_UANG_MAKAN(state, payload) {
      state.list_pegawai = payload;
    },
    SET_FORM_UANG_MAKAN(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_UANG_MAKAN(state) {
      state.form = {
        ...form,
      };
    },
    SET_IS_UPDATE_UANG_MAKAN(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async FetchUangMakan(context) {
      context.commit("SET_IS_LOADING_UANG_MAKAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-makan`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });

        context.commit("SET_REPORTS_UANG_MAKAN", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_UANG_MAKAN", false);
      }
    },
    async FetchUangMakanDetail(context, id) {
      context.commit("SET_IS_LOADING_UANG_MAKAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-makan/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_UANG_MAKAN", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_UANG_MAKAN", false);
      }
    },
    async FetchBeforeFormUangMakan(context) {
      context.commit("SET_IS_LOADING_UANG_MAKAN", true);

      try {
        const pegawai = await axios({
          url: `${apiUrl}/user/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_PEGAWAI_UANG_MAKAN", pegawai.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_UANG_MAKAN", false);
      }
    },
    async CreateUangMakan(context) {
      context.commit("SET_IS_LOADING_UANG_MAKAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-makan`,
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
        context.dispatch("FetchUangMakan");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_UANG_MAKAN", false);
      }
    },
    async SetFormUpdateUangMakan(context, id) {
      context.commit("SET_IS_LOADING_UANG_MAKAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-makan/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = result.data.data;
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_UANG_MAKAN", false);
      }
    },
    async UpdateUangMakan(context, id) {
      context.commit("SET_IS_LOADING_UANG_MAKAN", true);

      try {
        const payload = context.state.form;
        delete payload.user;
        delete payload.tahun;
        delete payload.bulan;

        const result = await axios({
          url: `${apiUrl}/uang-makan/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: payload,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });
        context.dispatch("FetchUangMakan");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_UANG_MAKAN", false);
      }
    },
    async DeleteUangMakan(context, id) {
      context.commit("SET_IS_LOADING_UANG_MAKAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uangMakan/${id}`,
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
        context.dispatch("FetchUangMakan");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_UANG_MAKAN", false);
      }
    },
  },
};

export default uangMakan;
