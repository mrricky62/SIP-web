<template>
  <div>
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Detail Uang Makan {{ report.user.nama }} pada {{ report.tanggal }}
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
              <tr>
                <br />
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="simple-table fs-14">
              <tr
                v-for="(item, i) in [
                  { key: 'No Rekening', value: report.no_rek },
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

        <table class="simple-table fs-14">
          <tr>
            <td style="min-width: 150px">Jumlah Hari</td>
            <td style="min-width: 20px">:</td>
            <td class="fw-medium">{{ report.jml_hari }}</td>
          </tr>
          <tr
            v-for="(item, i) in [
              { key: 'Tarif', value: report.tarif },
              { key: 'Kotor', value: report.kotor },
              { key: 'PPH', value: report.pph },
              { key: 'Bersih', value: report.bersih },
            ]"
            :key="i"
          >
            <td style="min-width: 150px">{{ item.key }}</td>
            <td style="min-width: 20px">:</td>
            <td class="fw-medium">Rp.{{ format3Digit(item.value) }}</td>
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
  name: "UangMakanDetail",
  components: {},
  data() {
    return {
      format3Digit,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.uangMakan.isLoading;
    },
    report() {
      return this.$store.state.uangMakan.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
  },
};
</script>
