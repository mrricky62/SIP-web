<template>
  <div>
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Detail Uang Lembur {{ report.user.nama }} pada {{ report.tanggal }}
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
            <table class="fs-14">
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
            <table class="fs-14">
              <tr
                v-for="(item, i) in [
                  { key: 'Tanggal', value: report.tanggal },
                  { key: 'Tanggal SPM', value: report.tanggal_spm },
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
        <br />

        <table class="fs-14">
          <tr
            v-for="(item, i) in [
              { key: 'Jam Kerja', value: report.jam_kerja },
              { key: 'Jam Libur', value: report.jam_libur },
              { key: 'Jam Makan', value: report.jam_makan },
              { key: 'Jumlah Jam', value: report.jumlah_jam },
              { key: 'Lembur', value: `RP.${format3Digit(report.lembur)}` },
              { key: 'Makan', value: `RP.${format3Digit(report.makan)}` },
              { key: 'PPH', value: `RP.${format3Digit(report.pph)}` },
              { key: 'Bersih', value: `RP.${format3Digit(report.bersih)}` },
            ]"
            :key="i"
          >
            <td style="min-width: 150px; line-height: 30px">{{ item.key }}</td>
            <td style="min-width: 20px">:</td>
            <td class="fw-medium">{{ item.value }}</td>
          </tr>
        </table>

        <br />
      </div>
    </v-card>
  </div>
</template>

<script>
import format3Digit from "@/utils/format-3digit.js";

export default {
  name: "UangLemburDetail",
  components: {},
  data() {
    return {
      format3Digit,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.uangLembur.isLoading;
    },
    report() {
      return this.$store.state.uangLembur.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
  },
};
</script>
