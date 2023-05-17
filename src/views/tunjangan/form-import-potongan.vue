<template>
  <form @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Form Import Tunjangan (Potongan)
          </p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <input
          type="file"
          class="form-control mb-3"
          required
          @change="handleFileUpload"
        />
        <a
          class="fs-14"
          :href="`${docUrl}/templates/template-tunjangan-potongan.xlsx`"
          download
        >
          Download Template Import
        </a>
        <br />
        <div class="d-flex justify-content-end">
          <button class="mr-5 text-muted" type="button" @click="handleClose">
            Kembali
          </button>
          <button
            class="btn bg-darkblue text-white"
            type="submit"
            :disabled="isLoading"
          >
            Import
          </button>
        </div>
      </div>
    </v-card>
  </form>
</template>

<script>
import { ValidationRules } from "@/mixins/validation-rules";
var XLSX = require("xlsx");
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "FormImportTunjanganPotongan",
  mixins: [ValidationRules],
  components: {},
  data() {
    return {
      docUrl: apiUrl.split("/api")[0],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.tunjangan.isLoading;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalFormImportPotongan", false);
    },
    handleFileUpload(e) {
      var files = e.target.files,
        f = files[0];
      var reader = new FileReader();

      const commit = this.$store.commit;
      reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        /* DO SOMETHING WITH workbook HERE */
        let worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);

        let payload = [];
        for (const iterator of json) {
          payload.push({
            nip: iterator.nip,
            tanggal: `${iterator.tahun}-${iterator.bulan}`,

            pot_iwp: iterator.iwp,
            pot_dkp: iterator.dkp,
            pot_pinjaman: iterator.pinjaman,
            pot_tmptinggal: iterator.tmpt_tinggal,
            pot_agama: iterator.agama,
            pot_darmawanita: iterator.darmawanita,
            pot_bapors: iterator.bapors,
            pot_kasangkatan: iterator.kas_angkatan,
            pot_uangmakan: iterator.uang_makan,
            pot_lain: iterator.lainnya,
            jumlah_potongan: iterator.jumlah,
          });
        }

        const chunked = payload.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / 100);

          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
          }

          resultArray[chunkIndex].push(item);

          return resultArray;
        }, []);

        commit("SET_FORM_IMPORT_POTONGAN_TUNJANGAN", chunked);
        console.log("chunked", chunked);
      };
      reader.readAsArrayBuffer(f);
    },
    async handleSubmit() {
      this.$store.dispatch("ImportTunjanganPotongan").then((res) => {
        if (res) {
          this.handleClose();
        }
      });
    },
  },
};
</script>
