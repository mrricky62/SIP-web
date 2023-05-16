import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import moment from "moment/moment";
import Swal from "sweetalert2";

const form = {
  user_id: "",
  tanggal: moment().format("YYYY-MM"),
  tanggal_spm: moment().format("YYYY-MM-DD"),
  jam_kerja: "",
  jam_libur: "",
  jam_makan: "",

  lembur: "0",
  makan: "0",
  pph: "0",
  bersih: "0",
};

const uangLembur = {
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
    SET_IS_LOADING_UANG_LEMBUR(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_UANG_LEMBUR(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_UANG_LEMBUR(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_UANG_LEMBUR(state, payload) {
      state.report = payload;
    },
    SET_LIST_PEGAWAI_UANG_LEMBUR(state, payload) {
      state.list_pegawai = payload;
    },
    SET_FORM_UANG_LEMBUR(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_UANG_LEMBUR(state) {
      state.form = {
        ...form,
      };
    },
    SET_FORM_IMPORT_UANG_LEMBUR(state, payload) {
      state.form_import = payload;
    },
    SET_IS_UPDATE_UANG_LEMBUR(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async FetchUangLembur(context) {
      context.commit("SET_IS_LOADING_UANG_LEMBUR", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-lembur`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });

        context.commit("SET_REPORTS_UANG_LEMBUR", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_UANG_LEMBUR", false);
      }
    },
    async FetchUangLemburDetail(context, id) {
      context.commit("SET_IS_LOADING_UANG_LEMBUR", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-lembur/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_UANG_LEMBUR", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_UANG_LEMBUR", false);
      }
    },
    async FetchBeforeFormUangLembur(context) {
      context.commit("SET_IS_LOADING_UANG_LEMBUR", true);

      try {
        const pegawai = await axios({
          url: `${apiUrl}/user/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_PEGAWAI_UANG_LEMBUR", pegawai.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_UANG_LEMBUR", false);
      }
    },
    async CreateUangLembur(context) {
      context.commit("SET_IS_LOADING_UANG_LEMBUR", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-lembur`,
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
        context.dispatch("FetchUangLembur");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_UANG_LEMBUR", false);
      }
    },
    async ImportUangLembur(context) {
      context.commit("SET_IS_LOADING_UANG_LEMBUR", true);

      try {
        for (const iterator of context.state.form_import) {
          await axios({
            url: `${apiUrl}/uang-lembur/import`,
            method: "POST",
            headers: {
              Authorization: `Bearer ${context.rootState.app.token}`,
            },
            data: {
              data: iterator,
            },
          });
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil diimport",
        });
        context.dispatch("FetchUangLembur");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_UANG_LEMBUR", false);
      }
    },
    async SetFormUpdateUangLembur(context, id) {
      context.commit("SET_IS_LOADING_UANG_LEMBUR", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-lembur/${id}`,
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
        context.commit("SET_IS_LOADING_UANG_LEMBUR", false);
      }
    },
    async UpdateUangLembur(context, id) {
      context.commit("SET_IS_LOADING_UANG_LEMBUR", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-lembur/${id}`,
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
        context.dispatch("FetchUangLembur");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_UANG_LEMBUR", false);
      }
    },
    async DeleteUangLembur(context, id) {
      context.commit("SET_IS_LOADING_UANG_LEMBUR", true);

      try {
        const result = await axios({
          url: `${apiUrl}/uang-lembur/${id}`,
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
        context.dispatch("FetchUangLembur");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_UANG_LEMBUR", false);
      }
    },
  },
};

export default uangLembur;
