import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import moment from "moment/moment";
import Swal from "sweetalert2";

const form = {
  user_id: "",
  tanggal: moment().format("YYYY-MM"),
  kdgol: "",
  nama_rek: "",
  nama_bank: "",
  no_rek: "",
  gaji_pokok: "",

  tunj_istri: "0",
  tunj_anak: "0",
  tunj_pns: "0",
  tunj_struk: "0",
  tunj_fungs: "0",
  tunj_daerah: "0",
  tunj_pencil: "0",
  tunj_tjlain: "0",
  tunj_kompen: "0",
  tunj_beras: "0",
  tunj_pph: "0",

  pembulatan: "0",

  pot_pfkbul: "0",
  pot_pfk2: "0",
  pot_pfk10: "0",
  pot_pph: "0",
  pot_swrum: "0",
  pot_kelbtj: "0",
  pot_lain: "0",
  pot_tabrum: "0",

  bersih: "0",
};

const gaji = {
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
    form_import: [],
    isUpdate: false,
  },
  mutations: {
    SET_IS_LOADING_GAJI(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_GAJI(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_GAJI(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_GAJI(state, payload) {
      state.report = payload;
    },
    SET_LIST_PEGAWAI_GAJI(state, payload) {
      state.list_pegawai = payload;
    },
    SET_FORM_GAJI(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_GAJI(state) {
      state.form = {
        ...form,
      };
    },
    SET_FORM_IMPORT_GAJI(state, payload) {
      state.form_import = payload;
    },
    SET_IS_UPDATE_GAJI(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async FetchGaji(context) {
      context.commit("SET_IS_LOADING_GAJI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/gaji`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });

        context.commit("SET_REPORTS_GAJI", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_GAJI", false);
      }
    },
    async FetchGajiDetail(context, id) {
      context.commit("SET_IS_LOADING_GAJI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/gaji/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_GAJI", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_GAJI", false);
      }
    },
    async FetchBeforeFormGaji(context) {
      context.commit("SET_IS_LOADING_GAJI", true);

      try {
        const pegawai = await axios({
          url: `${apiUrl}/user/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_PEGAWAI_GAJI", pegawai.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_GAJI", false);
      }
    },
    async CreateGaji(context) {
      context.commit("SET_IS_LOADING_GAJI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/gaji`,
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
        context.dispatch("FetchGaji");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_GAJI", false);
      }
    },
    async SetFormUpdateGaji(context, id) {
      context.commit("SET_IS_LOADING_GAJI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/gaji/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = result.data.data;
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_GAJI", false);
      }
    },
    async UpdateGaji(context, id) {
      context.commit("SET_IS_LOADING_GAJI", true);

      try {
        const payload = context.state.form;
        delete payload.user;
        delete payload.total_potongan;
        delete payload.total_tunjangan;

        const result = await axios({
          url: `${apiUrl}/gaji/${id}`,
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
        context.dispatch("FetchGaji");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_GAJI", false);
      }
    },
    async DeleteGaji(context, id) {
      context.commit("SET_IS_LOADING_GAJI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/gaji/${id}`,
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
        context.dispatch("FetchGaji");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_GAJI", false);
      }
    },
  },
};

export default gaji;
