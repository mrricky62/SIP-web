<template>
  <div>
    <div class="card border-0">
      <div class="card-body">
        <div class="d-flex flex-column flex-sm-row gap-2 gap-md-3">
          <CardHome type="pemasukan" :value="reports.historyIn" />
          <CardHome type="pengeluaran" :value="reports.historyOut" />
        </div>

        <br />
        <div class="p-3">
          <p class="fw-semibold">Riwayat</p>
          <v-data-table :headers="headers" :items="reports.history">
            <template v-slot:[`item.date`]="{ item }">
              {{ moment(item.date).format("YYYY-MM-DD") }}
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Home",
  components: {
    CardHome: () => import("@/components/molecules/card-home.vue"),
  },
  data() {
    return {
      moment,
      headers: [
        { text: "Date", value: "date" },
        { text: "Barang", value: "barang.name" },
        { text: "Barang Description", value: "barang.description" },
        { text: "Description", value: "description" },
        { text: "Quantity Sebelum", value: "qty_before" },
        { text: "Quantity Pengubah", value: "qty_change" },
        { text: "Quantity Sesudah", value: "qty_after" },
      ],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.dashboard.isLoading;
    },
    reports() {
      return this.$store.state.dashboard.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.dashboard.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_DASHBOARD", value);
      },
    },
  },
  mounted() {
    this.$store.dispatch("FetchDashboard");
  },
};
</script>
