import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import moment from "moment/moment";
import Swal from "sweetalert2";

const form = {
  user_id: "",
  tanggal: moment().format("YYYY-MM"),
  grade: "",
  nama_bank: "",
  no_rek: "",
  besaran_tunjangan: "",

  pot_hukdis: "0",
  pot_absen: "0",
  pot_pph: "0",

  pot_iwp: "0",
  pot_dkp: "0",
  pot_pinjaman: "0",
  pot_tmptinggal: "0",
  pot_agama: "0",
  pot_darmawanita: "0",
  pot_bapors: "0",
  pot_kasangkatan: "0",
  pot_uangmakan: "0",
  pot_lain: "0",
  jumlah_potongan: "0",

  tunj_netto: "0",
  tunj_pph: "0",
  permintaan: "0",
  tunj_dibayar: "0",
};

const tunjangan = {
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
    form_import_potongan: [],
    isUpdate: false,
  },
  mutations: {
    SET_IS_LOADING_TUNJANGAN(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_TUNJANGAN(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_TUNJANGAN(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_TUNJANGAN(state, payload) {
      state.report = payload;
    },
    SET_LIST_PEGAWAI_TUNJANGAN(state, payload) {
      state.list_pegawai = payload;
    },
    SET_FORM_TUNJANGAN(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_TUNJANGAN(state) {
      state.form = {
        ...form,
      };
    },
    SET_FORM_IMPORT_TUNJANGAN(state, payload) {
      state.form_import = payload;
    },
    SET_FORM_IMPORT_POTONGAN_TUNJANGAN(state, payload) {
      state.form_import_potongan = payload;
    },
    SET_IS_UPDATE_TUNJANGAN(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async FetchTunjangan(context) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/tunjangan`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });

        context.commit("SET_REPORTS_TUNJANGAN", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
    async FetchTunjanganDetail(context, id) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/tunjangan/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_TUNJANGAN", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
    async FetchBeforeFormTunjangan(context) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        const pegawai = await axios({
          url: `${apiUrl}/user/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_PEGAWAI_TUNJANGAN", pegawai.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
    async CreateTunjangan(context) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/tunjangan`,
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
        context.dispatch("FetchTunjangan");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
    async ImportTunjangan(context) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        for (const iterator of context.state.form_import) {
          await axios({
            url: `${apiUrl}/tunjangan/import`,
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
          text: "Import data tunjangan berhasil",
        });
        context.dispatch("FetchTunjangan");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
    async ImportTunjanganPotongan(context) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        for (const iterator of context.state.form_import_potongan) {
          await axios({
            url: `${apiUrl}/tunjangan/import-potongan`,
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
          text: "Import data tunjangan (potongan) berhasil",
        });
        context.dispatch("FetchTunjangan");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
    async SetFormUpdateTunjangan(context, id) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/tunjangan/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = result.data.data;
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
    async UpdateTunjangan(context, id) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        const payload = context.state.form;
        delete payload.user;
        delete payload.total_potongan;
        delete payload.total_tunjangan;

        const result = await axios({
          url: `${apiUrl}/tunjangan/${id}`,
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
        context.dispatch("FetchTunjangan");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
    async DeleteTunjangan(context, id) {
      context.commit("SET_IS_LOADING_TUNJANGAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/tunjangan/${id}`,
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
        context.dispatch("FetchTunjangan");

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_TUNJANGAN", false);
      }
    },
  },
};

export default tunjangan;
