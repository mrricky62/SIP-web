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

  tunj_istri: "",
  tunj_anak: "",
  tunj_pns: "",
  tunj_struk: "",
  tunj_fungs: "",
  tunj_daerah: "",
  tunj_pencil: "",
  tunj_tjlain: "",
  tunj_kompen: "",
  tunj_beras: "",
  tunj_pph: "",

  pembulatan: "",

  pot_pfkbul: "",
  pot_pfk2: "",
  pot_pfk10: "",
  pot_pph: "",
  pot_swrum: "",
  pot_kelbtj: "",
  pot_lain: "",
  pot_tabrum: "",

  bersih: "",
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
  },
};

export default gaji;
