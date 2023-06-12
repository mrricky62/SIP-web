import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import moment from "moment/moment";

const summary = {
  state: {
    isLoading: false,
    tanggal: moment().format("YYYY-MM"),
    report: {},
    isPrint: false,
  },
  mutations: {
    SET_IS_LOADING_SUMMARY(state, payload) {
      state.isLoading = payload;
    },
    SET_TANGGAL_SUMMARY(state, payload) {
      state.tanggal = payload;
    },
    SET_REPORTS_SUMMARY(state, payload) {
      state.report = payload;
    },
    SET_IS_PRINT_SUMMARY(state, payload) {
      state.isPrint = payload;
    },
  },
  actions: {
    async FetchSummary(context) {
      context.commit("SET_IS_LOADING_SUMMARY", true);

      try {
        const result = await axios({
          url: `${apiUrl}/summary?tanggal=${context.state.tanggal}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORTS_SUMMARY", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_SUMMARY", false);
      }
    },
  },
};

export default summary;
