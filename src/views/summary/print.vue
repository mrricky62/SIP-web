<template>
  <v-card class="card">
    <div class="card-body" id="printMe">
      <div class="d-flex">
        <img src="@/assets/header-surat.png" width="100" alt="logo" />
        <div class="text-center mx-auto">
          <p class="mb-0" style="font-size: 16px; font-weight: bold">
            KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
          </p>
          <p class="mb-0" style="font-size: 14px; font-weight: bold">
            DIREKTORAT JENDERAL BEA DAN CUKAI
          </p>
          <p class="mb-0" style="font-size: 14px; font-weight: bold">
            KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
          </p>
          <p class="mb-0" style="font-size: 10px">
            JALAN KUDA LAUT BATU AMPAR BATAM 29432
          </p>
          <p class="mb-0" style="font-size: 10px">
            TELEPON (0778) 458818, 458263; FAKSIMILI (0778) 458149; SITUS
            WWW.BCBATAM.BEACUKAI.GO.ID
          </p>
        </div>
      </div>
      <hr style="size: 1000px" />
      <br />
      <table>
        <tr
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
          <td style="min-width: 20px">:</td>
          <td class="fw-medium">
            {{ item.value }}
          </td>
        </tr>
      </table>
      <br />
      <p>
        Pegawai tersebut adalah pegawai yang bekerja pada Kantor Pelayanan Utama
        Bea dan Cukai Tipe B Batam, dengan penghasilan Bulan
        {{ report.bulan }} Tahun {{ report.tahun }} sebagai berikut:
      </p>
      <p class="fw-medium">Gaji</p>
      <table v-if="report.gaji">
        <tr
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
            {
              key: 'Jumlah Kotor',
              value: format3Digit(report.jumlah_kotor),
            },
            {
              key: 'Jumlah Potongan',
              value: format3Digit(report.tunjangan.jumlah_potongan),
            },
          ]"
          :key="i"
        >
          <td style="min-width: 220px">{{ item.key }}</td>
          <td style="min-width: 20px">:</td>
          <td class="fw-medium">Rp. {{ item.value }}</td>
        </tr>
      </table>
      <br />
      <p class="fw-medium">Potongan gaji Pokok</p>
      <table v-if="report.gaji">
        <tr
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
          <td style="min-width: 20px">:</td>
          <td class="fw-medium">Rp. {{ item.value }}</td>
        </tr>
      </table>
      <p v-else>Data Gaji belum tersedia</p>
      <table>
        <tr>
          <td style="min-width: 220px">Jumlah Bersih</td>
          <td style="min-width: 20px">:</td>
          <td class="fw-medium">
            Rp. {{ format3Digit(report.jumlah_bersih) }}
          </td>
        </tr>
        <tr>
          <br />
        </tr>
        <tr>
          <td style="min-width: 220px">Terbilang</td>
          <td style="min-width: 20px">:</td>
          <td class="fw-medium" style="text-transform: capitalize">
            {{ angkaTerbilang(report.jumlah_bersih) }} rupiah
          </td>
        </tr>
      </table>
    </div>
  </v-card>
</template>

<script>
import format3Digit from "@/utils/format-3digit.js";
import moment from "moment";
import angkaTerbilang from "@develoka/angka-terbilang-js";

export default {
  name: "SummaryPage",
  components: {},
  data() {
    return {
      angkaTerbilang,
      format3Digit,
      datenow: moment().format("DD MMMM YYYY"),
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.summary.isLoading;
    },
    isPrint() {
      return this.$store.state.summary.isPrint;
    },
    report() {
      return this.$store.state.summary.report;
    },
    user() {
      return this.$store.state.app.user;
    },
  },
  watch: {
    isPrint() {
      if (this.isPrint) {
        this.print();
      }
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("SET_IS_PRINT_SUMMARY", false);
      this.$emit("handleModalPrint", false);
    },
    async print() {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await this.$htmlToPaper("printMe");
      this.handleClose();
    },
  },
  mounted() {
    if (this.isPrint) {
      this.print();
    }
  },
};
</script>
