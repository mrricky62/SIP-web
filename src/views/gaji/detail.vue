<template>
  <div>
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Detail Gaji {{ report.user.nama }} pada {{ report.tanggal }}
          </p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <br />
        <table class="simple-table fs-14">
          <tr
            v-for="(item, i) in [
              { key: 'NIP', value: report.user.nip },
              { key: 'Nama', value: report.user.nama },
              { key: 'Pangkat', value: report.user.pangkat },
              { key: 'Golongan', value: report.user.golongan },
              { key: 'Nama Bank', value: report.nama_bank },
              { key: 'Nama Rekening', value: report.nama_rek },
              { key: 'No Rekening', value: report.no_rek },
            ]"
            :key="i"
          >
            <td style="min-width: 150px">{{ item.key }}</td>
            <td style="min-width: 20px">:</td>
            <td>{{ item.value }}</td>
          </tr>
        </table>
        <br />
        <table class="simple-table fs-14">
          <tr
            v-for="(item, i) in [
              { key: 'Gaji Pokok', value: format3Digit(report.gaji_pokok) },

              { key: 'Bersih', value: format3Digit(report.bersih) },
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
                    { key: 'Tunj Istri', value: report.tunj_istri },
                    { key: 'Tunj Anak', value: report.tunj_anak },
                    { key: 'Tunj Umum', value: report.tunj_pns },
                    { key: 'Tunj Struktural', value: report.tunj_struk },
                    { key: 'Tunj Fungsional', value: report.tunj_fungs },
                    { key: 'Tunj Daerah', value: report.tunj_daerah },
                    { key: 'Tunj Terpencil', value: report.tunj_pencil },
                    { key: 'Tunj lain', value: report.tunj_tjlain },
                    { key: 'Tunj Kompen', value: report.tunj_kompen },
                    { key: 'Tunj Beras', value: report.tunj_beras },
                    { key: 'Tunj PPH', value: report.tunj_pph },
                    {
                      key: 'Pembulatan',
                      value: format3Digit(report.pembulatan),
                    },
                    { key: 'Total Tunjangan', value: report.total_tunjangan },
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
                <p class="fs-14 fw-medium">Potongan</p>

                <div
                  class="d-flex justify-content-between"
                  v-for="(item, i) in [
                    { key: 'Pot Kelbtj', value: report.pot_pfkbul },
                    { key: 'Pot Pfk2', value: report.pot_pfk2 },
                    { key: 'Pot Pfk10', value: report.pot_pfk10 },
                    { key: 'Pot PPH', value: report.pot_pph },
                    { key: 'Pot Swrum', value: report.pot_swrum },
                    { key: 'Pot Kelbtj', value: report.pot_kelbtj },
                    { key: 'Pot Lain', value: report.pot_lain },
                    { key: 'Pot Tabrum', value: report.pot_tabrum },
                    { key: 'Total Potongan', value: report.total_potongan },
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
  name: "GajiDetail",
  components: {},
  data() {
    return {
      format3Digit,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.gaji.isLoading;
    },
    report() {
      return this.$store.state.gaji.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
  },
};
</script>
