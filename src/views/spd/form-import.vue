<template>
  <form @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Import SPD</p>
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
          :href="`${docUrl}/templates/template-spd.xlsx`"
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
  name: "FormImportTunjangan",
  mixins: [ValidationRules],
  components: {},
  data() {
    return {
      docUrl: apiUrl.split("/api")[0],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.spd.isLoading;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalFormImport", false);
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
            tanggal_spm: new Date(
              Math.round((iterator.tgl - 25569) * 86400 * 1000)
            ),
            no_st: iterator.no_st,
            no_spd: iterator.no_spd,
            tujuan: iterator.tujuan,
            sifat: iterator.sifat,

            uang_harian: iterator.uang_harian,
            uang_transport_pergi: iterator.uang_transport_pergi,
            uang_transport_pulang: iterator.uang_transport_pulang,
            uang_transport_dpd: iterator.uang_transport_dpr,
            uang_penginapan: iterator.uang_penginapan,

            total: iterator.total,
            lama: iterator.lama,
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

        commit("SET_FORM_IMPORT_SPD", chunked);
        console.log("chunked", chunked);
      };
      reader.readAsArrayBuffer(f);
    },
    async handleSubmit() {
      this.$store.dispatch("ImportSPD").then((res) => {
        if (res) {
          this.handleClose();
        }
      });
    },
  },
};
</script>
