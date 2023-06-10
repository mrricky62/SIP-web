<template>
  <layout-app>
    <HeaderTitle title="Dashboard" subtitle="Summary" />
    <div class="d-flex flex-wrap justify-content-between">
      <div class="me-3 search-input">
        <label class="fs-14 mb-2">Tanggal</label>
        <DatePicker v-model="tanggal" type="month" />
      </div>
      <v-btn
        class="btn text-white fw-normal bg-darkblue mb-3 mr-3"
        @click="exportToPDF"
      >
        <i class="fa fa-print"></i>
        Print
      </v-btn>
    </div>
    <div id="element-to-convert" ref="document">
      <table class="simple-table fs-14" width="100%">
        <tr>
          <td>
            <img src="@/assets/header-surat.png" width="100" alt="logo" />
          </td>
          <td style="text-align: center" width="590">
            <tr style="font-size: 16px; font-weight: bold">
              KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
            </tr>
            <tr style="font-size: 14px; font-weight: bold">
              DIREKTORAT JENDERAL BEA DAN CUKAI
            </tr>
            <tr style="font-size: 14px; font-weight: bold">
              KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
            </tr>
            <tr style="font-size: 10px">
              JALAN KUDA LAUT BATU AMPAR BATAM 29432
            </tr>
            <tr style="font-size: 10px">
              TELEPON (0778) 458818, 458263; FAKSIMILI (0778) 458149; SITUS
              WWW.BCBATAM.BEACUKAI.GO.ID
            </tr>
          </td>
        </tr>
      </table>
      <hr style="size: 1000px" />
      <br />
      <table class="simple-table fs-14">
        <tr
          class="d-block d-sm-table-row"
          v-for="(item, i) in [
            { key: 'Nama', value: user.nama },
            { key: 'NIP', value: user.nip },
            { key: 'Pangkat', value: user.pangkat },
            { key: 'Golongan', value: user.golongan },
            {
              key: 'Unit Kerja',
              value: 'Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam',
            },
          ]"
          :key="i"
        >
          <td style="min-width: 220px">{{ item.key }}</td>
          <td class="d-none d-sm-table-cell" style="min-width: 20px">:</td>
          <td class="d-none d-sm-table-cell fw-medium">
            {{ item.value }}
          </td>
        </tr>
      </table>
      <br />
      <p>
        Pegawai tersebut adalah pegawai yang bekerja pada Kantor Pelayanan Utama
        Bea dan Cukai Tipe B Batam, dengan penghasilan Bulan Tahun sebagai
        berikut:
      </p>
      <br />

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
              key: 'Tunjangan Istri/Suami',
              value: format3Digit(report.gaji.tunj_istri),
            },
            {
              key: 'Tunjangan Anak',
              value: format3Digit(report.gaji.tunj_anak),
            },
            {
              key: 'Tunjangan Beras',
              value: format3Digit(report.gaji.tunj_beras),
            },
            {
              key: 'Tunjangan Struktural',
              value: format3Digit(report.gaji.tunj_struk),
            },
            {
              key: 'Tunjangan Umum',
              value: format3Digit(report.gaji.tunj_pns),
            },
            {
              key: 'Tunjangan PPh',
              value: format3Digit(report.gaji.tunj_pph),
            },
            {
              key: 'Pembulatan',
              value: format3Digit(report.gaji.pembulatan),
            },
            {
              key: 'Uang Makan',
              value: format3Digit(report.uang_makan.bersih),
            },
            {
              key: 'Uang Lembur',
              value: format3Digit(report.uang_lembur.bersih),
            },
            {
              key: 'Tunjangan Kinerja',
              value: format3Digit(report.tunjangan.tunj_dibayar),
            },
          ]"
          :key="i"
        >
          <td style="min-width: 220px">{{ item.key }}</td>
          <td class="d-none d-sm-table-cell" style="min-width: 20px">:</td>
          <td class="d-none d-sm-table-cell fw-medium">Rp. {{ item.value }}</td>
        </tr>
        <tr>
          <br />
        </tr>
        <tr>
          <td style="min-width: 220px">Jumlah Kotor</td>
          <td class="d-none d-sm-table-cell" style="min-width: 20px">:</td>
          <td class="d-none d-sm-table-cell fw-medium">format3Digit</td>
        </tr>
        <tr>
          <br />
        </tr>
        <tr>
          Potongan gaji Pokok
        </tr>
        <tr
          class="d-block d-sm-table-row"
          v-for="(item, i) in [
            {
              key: 'IWP 10%',
              value: format3Digit(report.gaji.pot_pfk10),
            },
            {
              key: 'PPh Pasal 21',
              value: format3Digit(report.gaji.pot_pph),
            },
            {
              key: 'Taperum',
              value: format3Digit(report.gaji.pot_tabrum),
            },
            {
              key: 'Sewa Rumah Negara',
              value: format3Digit(report.gaji.pot_swrum),
            },
          ]"
          :key="i"
        >
          <td style="min-width: 220px">{{ item.key }}</td>
          <td class="d-none d-sm-table-cell" style="min-width: 20px">:</td>
          <td class="d-none d-sm-table-cell fw-medium">Rp. {{ item.value }}</td>
        </tr>
        <tr>
          <br />
        </tr>
        <tr>
          <td style="min-width: 220px">Jumlah Potongan</td>
          <td class="d-none d-sm-table-cell" style="min-width: 20px">:</td>
          <td class="d-none d-sm-table-cell fw-medium">
            Rp. {{ format3Digit(report.gaji.total_potongan) }}
          </td>
        </tr>
        <tr>
          <br />
        </tr>
        <tr>
          <td style="min-width: 320px">Jumlah Bersih</td>
          <td class="d-none d-sm-table-cell" style="min-width: 20px">:</td>
          <td class="d-none d-sm-table-cell fw-medium">format3Digit</td>
        </tr>
        <tr>
          <br />
        </tr>
        <tr>
          <td style="min-width: 220px">Terbilang</td>
          <td class="d-none d-sm-table-cell" style="min-width: 20px">:</td>
          <td class="d-none d-sm-table-cell fw-medium">format3Digit</td>
        </tr>
      </table>
      <p v-else class="fs-14 text-danger">Data Gaji belum tersedia</p>
    </div>
  </layout-app>
</template>

<script>
import LayoutApp from "../../layouts/layout-app.vue";
import format3Digit from "@/utils/format-3digit.js";
import html2pdf from "html2pdf.js";

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
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 1,
        filename: "i-was-html.pdf",
      });
    },
  },
  mounted() {
    this.$store.dispatch("FetchSummary");
  },
};
</script>
