<template>
  <div>
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Detail SPD</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div
          v-if="report.status === 'DITOLAK'"
          class="alert alert-danger"
          role="alert"
        >
          {{ report.catatan }}
        </div>
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
                  { key: 'Tanggal SPM', value: report.tanggal_spm },
                  { key: 'No SPD', value: report.no_spd },
                  { key: 'No ST', value: report.no_st },
                ]"
                :key="i"
              >
                <td style="min-width: 150px">{{ item.key }}</td>
                <td style="min-width: 20px">:</td>
                <td>{{ item.value }}</td>
              </tr>
              <tr>
                <td>Dokumen</td>
                <td>:</td>
                <td>
                  <a
                    :href="`${docUrl}/documents/${report.filepath}`"
                    target="_blank"
                  >
                    {{ report.filepath }}
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <br />
        <br />
        <table class="simple-table fs-14">
          <tr
            v-for="(item, i) in [
              { key: 'Tujuan', value: report.tujuan },
              { key: 'Sifat', value: report.sifat },
              { key: 'Lama', value: report.lama },
            ]"
            :key="i"
          >
            <td style="min-width: 200px; line-height: 28px">{{ item.key }}</td>
            <td style="min-width: 20px">:</td>
            <td class="">{{ item.value }}</td>
          </tr>
          <tr
            v-for="(item, i) in [
              { key: 'Uang Harian', value: report.uang_harian },
              {
                key: 'Uang Transport (pergi)',
                value: report.uang_transport_pergi,
              },
              {
                key: 'Uang Transport (pulang)',
                value: report.uang_transport_pulang,
              },
              {
                key: 'Daftar Pengeluaran Riil (DPR)',
                value: report.uang_transport_dpd,
              },
              { key: 'Uang Penginapan', value: report.uang_penginapan },
              { key: 'Total', value: report.total },
            ]"
            :key="i"
          >
            <td style="line-height: 28px">{{ item.key }}</td>
            <td>:</td>
            <td class="fw-medium">Rp.{{ format3Digit(item.value) }}</td>
          </tr>
        </table>
      </div>
    </v-card>
  </div>
</template>

<script>
import format3Digit from "@/utils/format-3digit.js";
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "SPDDetail",
  components: {},
  data() {
    return {
      format3Digit,
      // put url only
      docUrl: apiUrl.split("/api")[0],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.spd.isLoading;
    },
    report() {
      return this.$store.state.spd.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
  },
};
</script>
