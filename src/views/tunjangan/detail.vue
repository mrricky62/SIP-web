<template>
  <div>
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Detail Tunjangan {{ report.user.nama }} pada {{ report.tanggal }}
          </p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <br />
        <div class="row">
          <div class="col-md-6">
            <table class="simple-table fs-14">
              <tr
                v-for="(item, i) in [
                  { key: 'NIP', value: report.user.nip },
                  { key: 'Nama', value: report.user.nama },
                  { key: 'Pangkat', value: report.user.pangkat },
                  { key: 'Golongan', value: report.user.golongan },
                ]"
                :key="i"
              >
                <td style="min-width: 150px">{{ item.key }}</td>
                <td style="min-width: 20px">:</td>
                <td>{{ item.value }}</td>
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="simple-table fs-14">
              <tr
                v-for="(item, i) in [
                  { key: 'Nama Bank', value: report.nama_bank },
                  { key: 'No Rekening', value: report.no_rek },
                ]"
                :key="i"
              >
                <td style="min-width: 150px">{{ item.key }}</td>
                <td style="min-width: 20px">:</td>
                <td>{{ item.value }}</td>
              </tr>
            </table>
          </div>
        </div>
        <br />
        <table class="simple-table fs-14">
          <tr
            v-for="(item, i) in [
              { key: 'Grade', value: report.grade },
              { key: 'Tanggal', value: report.tanggal },
            ]"
            :key="i"
          >
            <td style="min-width: 150px">{{ item.key }}</td>
            <td style="min-width: 20px">:</td>
            <td>{{ item.value }}</td>
          </tr>
        </table>
        <br />
        <br />
        <div class="row">
          <div class="col-md-5">
            <div class="card">
              <div class="card-body">
                <p class="fs-14 fw-medium">Tunjangan</p>

                <div
                  class="d-flex justify-content-between"
                  v-for="(item, i) in [
                    { key: 'Besar Tunjangan', value: report.besaran_tunjangan },
                    { key: 'Pot Hukdis', value: report.pot_hukdis },
                    { key: 'Pot Absen', value: report.pot_absen },
                    { key: 'Tunj Netto', value: report.tunj_netto },
                    { key: 'Tunj PPH', value: report.tunj_pph },
                    { key: 'Pot PPH', value: report.pot_pph },
                    { key: 'Permintaan', value: report.permintaan },
                    { key: 'Tunjangan Dibayar', value: report.tunj_dibayar },
                  ]"
                  :key="i"
                >
                  <p class="fs-14 mb-1">{{ item.key }}</p>
                  <p class="fs-14 mb-1 fw-medium">
                    {{ format3Digit(item.value) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="card">
              <div class="card-body">
                <p class="fs-14 fw-medium">Potongan Kantor</p>

                <div
                  class="d-flex justify-content-between"
                  v-for="(item, i) in [
                    { key: 'Pot IWP', value: report.pot_iwp },
                    { key: 'Pot DKP', value: report.pot_dkp },
                    { key: 'Pot Pinjaman', value: report.pot_pinjaman },
                    { key: 'Pot Tempat Tinggal', value: report.pot_tmptinggal },
                    { key: 'Pot Agama', value: report.pot_agama },
                    { key: 'Pot Darmawanita', value: report.pot_darmawanita },
                    { key: 'Pot Bapors', value: report.pot_bapors },
                    { key: 'Pot Kasangkatan', value: report.pot_kasangkatan },
                    { key: 'Pot Uang Makan', value: report.pot_uangmakan },
                    { key: 'Pot Lainnya', value: report.pot_lain },
                    { key: 'Total Potongan', value: report.jumlah_potongan },
                  ]"
                  :key="i"
                >
                  <p class="fs-14 mb-1">{{ item.key }}</p>
                  <p class="fs-14 mb-1 fw-medium">
                    {{ format3Digit(item.value) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </v-card>
  </div>
</template>

<script>
import format3Digit from "@/utils/format-3digit.js";

export default {
  name: "TunjanganDetail",
  components: {},
  data() {
    return {
      format3Digit,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.tunjangan.isLoading;
    },
    report() {
      return this.$store.state.tunjangan.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
  },
};
</script>
