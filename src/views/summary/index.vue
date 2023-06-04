<template>
  <layout-app>
    <HeaderTitle title="Dashboard" subtitle="Summary" />
    <v-card class="card p-3 border-0 shadow-none" :loading="isLoading">
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
                  { key: 'NIP', value: user.nip },
                  { key: 'Nama', value: user.nama },
                  { key: 'Pangkat', value: user.pangkat },
                  { key: 'Golongan', value: user.golongan },
                ]"
                :key="i"
              >
                <td style="min-width: 220px">{{ item.key }}</td>
                <td class="d-none d-sm-table-cell" style="min-width: 20px">
                  :
                </td>
                <td class="d-none d-sm-table-cell fw-medium">
                  {{ item.value }}
                </td>
                <div class="d-sm-none fw-medium mb-3">{{ item.value }}</div>
              </tr>
            </table>
            <hr />
            <br />
            <div class="row">
              <div class="col-md-12 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">Gaji</p>
                    <table v-if="report.gaji" class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          {
                            key: 'Gaji Pokok',
                            value: format3Digit(report.gaji.gaji_pokok),
                          },
                          {
                            key: 'Pembulatan',
                            value: format3Digit(report.gaji.pembulatan),
                          },
                          {
                            key: 'Total Tunjangan',
                            value: format3Digit(report.gaji.total_tunjangan),
                          },
                          {
                            key: 'Total Potongan',
                            value: format3Digit(report.gaji.total_potongan),
                          },
                          {
                            key: 'Bersih',
                            value: format3Digit(report.gaji.bersih),
                          },
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
                        <td class="d-none d-sm-table-cell fw-medium">
                          {{ item.value }}
                        </td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                    <p v-else class="fs-14 text-danger">
                      Data Gaji belum tersedia
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">Tunjangan</p>
                    <table v-if="report.tunjangan" class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          {
                            key: 'Grade',
                            value: report.tunjangan.grade,
                          },
                          {
                            key: 'Besar Tunjangan',
                            value: format3Digit(
                              report.tunjangan.besaran_tunjangan
                            ),
                          },
                          {
                            key: 'Permintaan',
                            value: format3Digit(report.tunjangan.permintaan),
                          },
                          {
                            key: 'Total Potongan',
                            value: format3Digit(
                              report.tunjangan.jumlah_potongan
                            ),
                          },
                          {
                            key: 'Tunjangan Dibayar',
                            value: format3Digit(report.tunjangan.tunj_dibayar),
                          },
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
                        <td class="d-none d-sm-table-cell fw-medium">
                          {{ item.value }}
                        </td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                    <p v-else class="fs-14 text-danger">
                      Data Tunjangan belum tersedia
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">Uang Makan</p>
                    <table v-if="report.uang_makan" class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          {
                            key: 'Jumlah Hari',
                            value: report.uang_makan.jml_hari,
                          },
                          {
                            key: 'Tarif',
                            value: format3Digit(report.uang_makan.tarif),
                          },
                          {
                            key: 'Kotor',
                            value: format3Digit(report.uang_makan.kotor),
                          },
                          {
                            key: 'PPH',
                            value: format3Digit(report.uang_makan.pph),
                          },
                          {
                            key: 'Bersih',
                            value: format3Digit(report.uang_makan.bersih),
                          },
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
                        <td class="d-none d-sm-table-cell fw-medium">
                          {{ item.value }}
                        </td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                    <p v-else class="fs-14 text-danger">
                      Data Uang Makan belum tersedia
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">SPD</p>
                    <table v-if="report.spd" class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          {
                            key: 'Tujuan',
                            value: report.spd.tujuan,
                          },
                          {
                            key: 'Sifat',
                            value: report.spd.sifat,
                          },
                          {
                            key: 'Lama',
                            value: report.spd.lama,
                          },
                          {
                            key: 'Uang Harian',
                            value: format3Digit(report.spd.uang_harian),
                          },
                          {
                            key: 'Uang Transport (pergi)',
                            value: format3Digit(
                              report.spd.uang_transport_pergi
                            ),
                          },
                          {
                            key: 'Uang Transport (pulang)',
                            value: format3Digit(
                              report.spd.uang_transport_pulang
                            ),
                          },
                          {
                            key: 'Daftar Pengeluaran Riil (DPR)',
                            value: format3Digit(report.spd.uang_transport_dpd),
                          },
                          {
                            key: 'Uang Penginapan',
                            value: format3Digit(report.spd.uang_penginapan),
                          },
                          {
                            key: 'Total',
                            value: format3Digit(report.spd.total),
                          },
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
                        <td class="d-none d-sm-table-cell fw-medium">
                          {{ item.value }}
                        </td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                    <p v-else class="fs-14 text-danger">
                      Data SPD belum tersedia
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-5">
                <div class="card">
                  <div class="card-body">
                    <p class="fs-14 fw-medium">Uang Lembur</p>
                    <table v-if="report.uang_lembur" class="simple-table fs-14">
                      <tr
                        class="d-block d-sm-table-row"
                        v-for="(item, i) in [
                          {
                            key: 'Jam Kerja',
                            value: report.uang_lembur.jam_kerja,
                          },
                          {
                            key: 'Jam Libur',
                            value: report.uang_lembur.jam_libur,
                          },
                          {
                            key: 'Jam Makan',
                            value: report.uang_lembur.jam_makan,
                          },
                          {
                            key: 'Lembur',
                            value: format3Digit(report.uang_lembur.lembur),
                          },
                          {
                            key: 'Makan',
                            value: format3Digit(report.uang_lembur.makan),
                          },
                          {
                            key: 'PPH',
                            value: format3Digit(report.uang_lembur.pph),
                          },
                          {
                            key: 'Bersih',
                            value: format3Digit(report.uang_lembur.bersih),
                          },
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
                        <td class="d-none d-sm-table-cell fw-medium">
                          {{ item.value }}
                        </td>
                        <div class="d-sm-none fw-medium mb-3">
                          {{ item.value }}
                        </div>
                      </tr>
                    </table>
                    <p v-else class="fs-14 text-danger">
                      Data Uang Lembur belum tersedia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </layout-app>
</template>

<script>
import LayoutApp from "../../layouts/layout-app.vue";
import format3Digit from "@/utils/format-3digit.js";

export default {
  name: "SummaryPage",
  components: {
    LayoutApp,
    HeaderTitle: () => import("@/components/molecules/header-title.vue"),
    DatePicker: () => import("@/components/atoms/date-picker.vue"),
  },
  data() {
    return {
      format3Digit,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.summary.isLoading;
    },
    report() {
      return this.$store.state.summary.report;
    },
    user() {
      return this.$store.state.app.user;
    },
    tanggal: {
      get() {
        return this.$store.state.summary.tanggal;
      },
      set(value) {
        this.$store.commit("SET_TANGGAL_SUMMARY", value);
      },
    },
  },
  watch: {
    tanggal() {
      this.$store.dispatch("FetchSummary");
    },
  },
  methods: {},
  mounted() {
    this.$store.dispatch("FetchSummary");
  },
};
</script>
