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
  is_active: true,
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
    list_pangkat: [
      {
        Golongan: "I/a",
        Pangkat: "Juru Muda",
      },
      {
        Golongan: "I/b",
        Pangkat: "Juru Muda Tingkat 1",
      },
      {
        Golongan: "I/c",
        Pangkat: "Juru",
      },
      {
        Golongan: "I/d",
        Pangkat: "Juru Tingkat 1",
      },
      {
        Golongan: "II/a",
        Pangkat: "Pengatur Muda",
      },
      {
        Golongan: "II/b",
        Pangkat: "Pengatur Muda Tingkat 1",
      },
      {
        Golongan: "II/c",
        Pangkat: "Pengatur",
      },
      {
        Golongan: "II/d",
        Pangkat: "Pengatur Tingkat 1",
      },
      {
        Golongan: "III/a",
        Pangkat: "Penata Muda",
      },
      {
        Golongan: "III/b",
        Pangkat: "Penata Muda Tingkat 1",
      },
      {
        Golongan: "III/c",
        Pangkat: "Penata",
      },
      {
        Golongan: "III/d",
        Pangkat: "Penata Tingkat 1",
      },
      {
        Golongan: "IV/a",
        Pangkat: "Pembina",
      },
      {
        Golongan: "IV/b",
        Pangkat: "Pembina Tingkat 1",
      },
      {
        Golongan: "IV/c",
        Pangkat: "Pembina Utama Muda",
      },
      {
        Golongan: "IV/d",
        Pangkat: "Pembina Utama Madya",
      },
      {
        Golongan: "IV/e",
        Pangkat: "Pembina Utama",
      },
    ],
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
    async SetFormUser(context, id) {
      context.commit("SET_IS_LOADING_PEGAWAI", true);
      try {
        const result = await axios({
          url: `${apiUrl}/user/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = {
          nip: result.data.data.nip,
          nama: result.data.data.nama,
          pangkat: result.data.data.pangkat,
          golongan: result.data.data.golongan,
          password: "",
          is_admin: result.data.data.is_admin,
          is_active: result.data.data.is_active,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PEGAWAI", false);
      }
    },
    async UpdateUser(context, id) {
      context.commit("SET_IS_LOADING_PEGAWAI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/user/${id}`,
          method: "PUT",
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
