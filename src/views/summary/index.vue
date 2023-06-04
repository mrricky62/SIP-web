<template>
  <layout-app>
    <HeaderTitle title="Dashboard" subtitle="Summary" />
    <div class="card p-3 border-0">
      <div class="card-body">
        <div class="d-flex flex-wrap justify-content-between">
          <div class="me-3 search-input">
            <label class="fs-14 mb-2">Tanggal</label>
            <DatePicker v-model="tanggal" type="month" />
          </div>
          <!-- <v-btn class="btn text-white fw-normal bg-darkblue mb-3 mr-3">
            <i class="fa fa-print"></i>
            Print
          </v-btn> -->
        </div>
        <div class="card">
          <div class="card-body">
            <table class="simple-table fs-14">
              <tr
                class="d-block d-sm-table-row"
                v-for="(item, i) in [
                  { key: 'NIP', value: '' },
                  { key: 'Nama', value: '' },
                  { key: 'Pangkat', value: '' },
                  { key: 'Golongan', value: '' },
                ]"
                :key="i"
              >
                <td style="min-width: 220px">{{ item.key }}</td>
                <td class="d-none d-sm-table-cell" style="min-width: 20px">
                  :
                </td>
                <td class="d-none d-sm-table-cell">{{ item.value }}</td>
                <div class="d-sm-none fw-medium mb-3">{{ item.value }}</div>
              </tr>
            </table>
            <hr />
            <br />
            <div class="row">
              <div class="col-md-4 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">Gaji</p>
                    <table class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          { key: 'Gaji Pokok', value: '' },
                          { key: 'Pembulatan', value: '' },
                          { key: 'Total Tunjangan', value: '' },
                          { key: 'Total Potongan', value: '' },
                          { key: 'Bersih', value: '' },
                        ]"
                        :key="i"
                      >
                        <td style="min-width: 220px">{{ item.key }}</td>
                        <td
                          class="d-none d-sm-table-cell"
                          style="min-width: 20px"
                        >
                          :
                        </td>
                        <td class="d-none d-sm-table-cell">{{ item.value }}</td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">Tunjangan</p>
                    <table class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          { key: 'Grade', value: '' },
                          { key: 'Besar Tunjangan', value: '' },
                          { key: 'Permintaan', value: '' },
                          { key: 'Total Potongan', value: '' },
                          { key: 'Tunjangan Dibayar', value: '' },
                        ]"
                        :key="i"
                      >
                        <td style="min-width: 220px">{{ item.key }}</td>
                        <td
                          class="d-none d-sm-table-cell"
                          style="min-width: 20px"
                        >
                          :
                        </td>
                        <td class="d-none d-sm-table-cell">{{ item.value }}</td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">Uang Makan</p>
                    <table class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          { key: 'Jumlah Hari', value: '' },
                          { key: 'Tarif', value: '' },
                          { key: 'Kotor', value: '' },
                          { key: 'PPH', value: '' },
                          { key: 'Bersih', value: '' },
                        ]"
                        :key="i"
                      >
                        <td style="min-width: 220px">{{ item.key }}</td>
                        <td
                          class="d-none d-sm-table-cell"
                          style="min-width: 20px"
                        >
                          :
                        </td>
                        <td class="d-none d-sm-table-cell">{{ item.value }}</td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">SPD</p>
                    <table class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          { key: 'Tujuan', value: '' },
                          { key: 'Sifat', value: '' },
                          { key: 'Lama', value: '' },
                          { key: 'Uang Harian', value: '' },
                          { key: 'Uang Transport (pergi)', value: '' },
                          { key: 'Uang Transport (pulang)', value: '' },
                          { key: 'Daftar Pengeluaran Riil (DPR)', value: '' },
                          { key: 'Uang Penginapan', value: '' },
                          { key: 'Total', value: '' },
                        ]"
                        :key="i"
                      >
                        <td style="min-width: 220px">{{ item.key }}</td>
                        <td
                          class="d-none d-sm-table-cell"
                          style="min-width: 20px"
                        >
                          :
                        </td>
                        <td class="d-none d-sm-table-cell">{{ item.value }}</td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">Uang Lembur</p>
                    <table class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          { key: 'Jam Kerja', value: 'report' },
                          { key: 'Jam Libur', value: 'report' },
                          { key: 'Jam Makan', value: 'report' },
                          { key: 'Jumlah Jam', value: 'report' },
                          { key: 'Lembur', value: 'report' },
                          { key: 'Makan', value: 'report' },
                          { key: 'PPH', value: 'report' },
                          { key: 'Bersih', value: 'report' },
                        ]"
                        :key="i"
                      >
                        <td style="min-width: 220px">{{ item.key }}</td>
                        <td
                          class="d-none d-sm-table-cell"
                          style="min-width: 20px"
                        >
                          :
                        </td>
                        <td class="d-none d-sm-table-cell">{{ item.value }}</td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout-app>
</template>

<script>
import LayoutApp from "../../layouts/layout-app.vue";
import moment from "moment";

export default {
  name: "SummaryPage",
  components: {
    LayoutApp,
    HeaderTitle: () => import("@/components/molecules/header-title.vue"),
    DatePicker: () => import("@/components/atoms/date-picker.vue"),
  },
  data() {
    return {
      tanggal: moment().format("YYYY-MM"),
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.uangMakan.isLoading;
    },
    reports() {
      return this.$store.state.uangMakan.reports;
    },
    isAdmin() {
      return this.$store.state.app.user.is_admin;
    },
  },
  methods: {},
  mounted() {
    // this.$store.dispatch("FetchUangMakan");
  },
};
</script>
