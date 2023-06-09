import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const form = {
  filepath: "",
  no_st: "",
  no_spd: "",
  tujuan: "",
  sifat: "",
  lama: "0",
  uang_transport_pergi: "0",
  uang_transport_pulang: "0",
  uang_transport_dpd: "0",
  uang_penginapan: "0",
};

const form_approve = {
  no_st: "",
  no_spd: "",
  tujuan: "",
  sifat: "",
  lama: "0",
  uang_harian: "0",
  uang_transport_pergi: "0",
  uang_transport_pulang: "0",
  uang_transport_dpd: "0",
  uang_penginapan: "0",
  total: "0",
};

const form_reject = {
  catatan: "",
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
    form_approve: {
      ...form_approve,
    },
    form_reject: {
      ...form_reject,
    },
    form_import: [],
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
    SET_FORM_APPROVE_SPD(state, payload) {
      state.form_approve[payload.key] = payload.value;
    },
    RESET_FORM_APPROVE_SPD(state) {
      state.form_approve = {
        ...form_approve,
      };
    },
    SET_FORM_REJECT_SPD(state, payload) {
      state.form_reject[payload.key] = payload.value;
    },
    RESET_FORM_REJECT_SPD(state) {
      state.form_reject = {
        ...form_reject,
      };
    },
    SET_FORM_IMPORT_SPD(state, payload) {
      state.form_import = payload;
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
        const payload = new FormData();
        payload.append("filepath", context.state.form.filepath);
        payload.append("no_st", context.state.form.no_st);
        payload.append("no_spd", context.state.form.no_spd);
        payload.append("tujuan", context.state.form.tujuan);
        payload.append("sifat", context.state.form.sifat);
        payload.append("lama", context.state.form.lama);
        payload.append(
          "uang_transport_pergi",
          context.state.form.uang_transport_pergi
        );
        payload.append(
          "uang_transport_pulang",
          context.state.form.uang_transport_pulang
        );
        payload.append(
          "uang_transport_dpd",
          context.state.form.uang_transport_dpd
        );
        payload.append("uang_penginapan", context.state.form.uang_penginapan);

        const result = await axios({
          url: `${apiUrl}/spd`,
          method: "POST",
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
    async ImportSPD(context) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        for (const iterator of context.state.form_import) {
          await axios({
            url: `${apiUrl}/spd/import`,
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
          text: "Import data SPD berhasil",
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
    async FetchBeforeApproveSPD(context, id) {
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

        context.state.form_approve = {
          no_st: data.no_st,
          no_spd: data.no_spd,
          tujuan: data.tujuan,
          sifat: data.sifat,
          lama: data.lama,

          uang_harian: data.uang_harian,
          uang_transport_pergi: data.uang_transport_pergi,
          uang_transport_pulang: data.uang_transport_pulang,
          uang_transport_dpd: data.uang_transport_dpd,
          uang_penginapan: data.uang_penginapan,
          total:
            +data.uang_harian +
            +data.uang_transport_pergi +
            +data.uang_transport_pulang +
            +data.uang_transport_dpd +
            +data.uang_penginapan,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_SPD", false);
      }
    },
    async ApproveSPD(context, id) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/spd/approve/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_approve,
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
    async RejectSPD(context, id) {
      context.commit("SET_IS_LOADING_SPD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/spd/reject/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_reject,
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
          filepath: "",
          no_st: data.no_st,
          no_spd: data.no_spd,
          tujuan: data.tujuan,
          sifat: data.sifat,
          lama: data.lama,
          uang_transport_pergi: data.uang_transport_pergi,
          uang_transport_pulang: data.uang_transport_pulang,
          uang_transport_dpd: data.uang_transport_dpd,
          uang_penginapan: data.uang_penginapan,
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
        const payload = new FormData();
        if (context.state.form.filepath !== "") {
          payload.append("filepath", context.state.form.filepath);
        }
        payload.append("no_st", context.state.form.no_st);
        payload.append("no_spd", context.state.form.no_spd);
        payload.append("tujuan", context.state.form.tujuan);
        payload.append("sifat", context.state.form.sifat);
        payload.append("lama", context.state.form.lama);
        payload.append(
          "uang_transport_pergi",
          context.state.form.uang_transport_pergi
        );
        payload.append(
          "uang_transport_pulang",
          context.state.form.uang_transport_pulang
        );
        payload.append(
          "uang_transport_dpd",
          context.state.form.uang_transport_dpd
        );
        payload.append("uang_penginapan", context.state.form.uang_penginapan);

        const result = await axios({
          url: `${apiUrl}/spd/${id}`,
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
