<template>
  <v-card class="card">
    <div class="card-body" id="printMe">
      <div class="d-flex">
        <img
          src="@/assets/header-surat.png"
          width="85"
          height="85"
          alt="log"
          style="margin-left: 30px"
        />
        <div class="text-center mx-auto" style="font-family: 'Times New Roman'">
          <p
            style="
              font-size: 16px;
              font-weight: bold;
              margin: 0%;
              line-height: 20px;
            "
          >
            KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
          </p>
          <p
            style="
              font-size: 14px;
              font-weight: bold;
              margin: 0%;
              line-height: 18px;
            "
          >
            DIREKTORAT JENDERAL BEA DAN CUKAI
          </p>
          <p
            style="
              font-size: 14px;
              font-weight: bold;
              margin: 0%;
              line-height: 18px;
            "
          >
            KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
          </p>
          <p
            style="
              font-size: 10px;
              margin: 0%;
              line-height: 13px;
              text-decoration-color: blue;
            "
          >
            JALAN KUDA LAUT BATU AMPAR BATAM 29432
          </p>
          <p style="font-size: 10px; margin: 0%; line-height: 14px">
            TELEPON (0778) 458818, 458263; FAKSIMILI (0778) 458149; SITUS
            WWW.BCBATAM.BEACUKAI.GO.ID
          </p>
        </div>
      </div>

      <hr style="color: rgb(0, 0, 0)" />

      <p
        style="
          text-align: center;
          margin-bottom: 5px;
          font-weight: bold;
          font-family: 'Times New Roman';
        "
      >
        <u>SURAT KETERANGAN PENGHASILAN</u>
      </p>
      <p
        style="
          text-indent: 45px;
          margin-bottom: 5px;
          font-family: 'Times New Roman';
        "
      >
        Yang bertanda tangan di bawah ini, menerangkan bahwa:
      </p>

      <table style="font-family: 'Times New Roman'; font-size: 14px">
        <tr
          v-for="(item, i) in [
            { key: 'Nama', value: user.nama },
            { key: 'NIP', value: user.nip },
          ]"
          :key="i"
        >
          <td style="min-width: 220px">{{ item.key }}</td>
          <td style="min-width: 20px">:</td>
          <td class="fw-medium">
            {{ item.value }}
          </td>
        </tr>
        <tr>
          <td style="min-width: 220px">Pangkat / Golongan</td>
          <td style="min-width: 20px">:</td>
          <td class="fw-medium">{{ user.pangkat }} / {{ user.golongan }}</td>
        </tr>
        <tr>
          <td style="min-width: 220px">Unit Kerja</td>
          <td style="min-width: 20px">:</td>
          <td class="fw-medium">
            Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam
          </td>
        </tr>
      </table>
      <p
        style="
          margin-top: 7px;
          margin-bottom: 5px;
          font-family: 'Times New Roman';
          font-size: 14px;
        "
      >
        Pegawai tersebut adalah pegawai yang bekerja pada Kantor Pelayanan Utama
        Bea dan Cukai Tipe B Batam, dengan penghasilan Bulan
        {{ report.bulan }} Tahun {{ report.tahun }} sebagai berikut:
      </p>
      <table
        v-if="report.gaji"
        style="font-family: 'Times New Roman'; font-size: 14px"
      >
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
          ]"
          :key="i"
        >
          <td style="min-width: 220px">{{ item.key }}</td>
          <td style="min-width: 20px">:</td>
          <td>Rp.</td>
          <td class="fw-medium" style="text-align: right" width="85px">
            {{ item.value }}
          </td>
        </tr>
      </table>
      <table
        style="margin-top: 5px; font-family: 'Times New Roman'; font-size: 14px"
      >
        <td style="min-width: 80px"></td>
        <td style="min-width: 180px; text-align: left">
          <b>Jumlah Kotor</b>
        </td>
        <td style="min-width: 20px"><b>:</b></td>
        <td><b>Rp.</b></td>
        <td class="fw-medium" width="105px" style="text-align: right">
          <b
            ><u>{{ format3Digit(report.jumlah_kotor) }}</u></b
          >
        </td>
      </table>
      <p
        class="fw-medium"
        style="
          margin-top: 6px;
          margin-bottom: 2px;
          font-family: 'Times New Roman';
          font-size: 14px;
        "
      >
        Potongan gaji Pokok
      </p>
      <table
        v-if="report.gaji"
        style="font-family: 'Times New Roman'; font-size: 14px"
      >
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
      <table
        style="
          margin-top: 5px;
          margin-bottom: 10px;
          line-height: 20px;
          font-family: 'Times New Roman';
          font-size: 14px;
        "
      >
        <tr>
          <td style="min-width: 80px"></td>
          <td style="min-width: 180px; text-align: left">
            <b>Jumlah Potongan</b>
          </td>
          <td style="min-width: 20px"><b>:</b></td>
          <td><b>Rp.</b></td>
          <td class="fw-medium" width="105px" style="text-align: right">
            <b
              ><u>{{ format3Digit(report.gaji.total_potongan) }}</u></b
            >
          </td>
        </tr>
        <tr>
          <td style="min-width: 80px"></td>
          <td style="text-align: left">
            <b>Jumlah Bersih</b>
          </td>
          <td style="min-width: 20px"><b>:</b></td>
          <td><b>Rp.</b></td>
          <td class="fw-medium" width="105px" style="text-align: right">
            <b
              ><u>{{ format3Digit(report.jumlah_bersih) }}</u></b
            >
          </td>
        </tr>
      </table>
      <table style="font-family: 'Times New Roman'; font-size: 14px">
        <td style="min-width: 90px; vertical-align: top">
          <b>Terbilang :</b>
        </td>
        <td style="vertical-align: top; text-transform: capitalize">
          <b> {{ angkaTerbilang(report.jumlah_bersih) }} Rupiah</b>
        </td>
      </table>
      <table
        style="
          font-family: 'Times New Roman';
          margin-top: 50px;
          font-size: 14px;
        "
      >
        <td style="min-width: 420px"></td>
        <td>
          Batam, {{ datenow }} <br />
          Bendahara Pengeluaran,<br /><br />
          ttd<br /><br />
          Hasiana Dewi<br />
          NIP 19961211 201801 2 001<br />
        </td>
      </table>
      <p style="margin-top: 40px; font-size: 10px">
        *Dokumen ini dibuat otomatis secara komputerisasi, tidak memerlukan
        tandatangan dan stempel
      </p>
    </div>
  </v-card>
</template>

<script>
import format3Digit from "@/utils/format-3digit.js";
import moment from "moment";
import "moment/locale/id";
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
