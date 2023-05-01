import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;

const dashboard = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: {
      historyIn: 0,
      historyOut: 0,
      history: [],
    },
  },
  mutations: {
    SET_IS_LOADING_DASHBOARD(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_DASHBOARD(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_DASHBOARD(state, payload) {
      state.reports = payload;
    },
  },
  actions: {
    async FetchDashboard(context) {
      context.commit("SET_IS_LOADING_DASHBOARD", true);

      try {
        const result = await axios({
          url: `${apiUrl}/dashboard`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORTS_DASHBOARD", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_DASHBOARD", false);
      }
    },
  },
};

export default dashboard;
