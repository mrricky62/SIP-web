<template>
  <form @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Import Lembur Makan</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <input
          type="file"
          class="form-control"
          required
          @change="handleFileUpload"
        />
        <br />
        <div class="d-flex justify-content-end">
          <button class="mr-5 text-muted" type="button" @click="handleClose">
            Kembali
          </button>
          <button class="btn bg-darkblue text-white" type="submit">
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

export default {
  name: "FormImportUangLembur",
  mixins: [ValidationRules],
  components: {},
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.gaji.isLoading;
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
            tanggal: `${iterator.thn}-${iterator.bln}`,
            tanggal_spm: new Date(
              Math.round((iterator.tgl - 25569) * 86400 * 1000)
            ),
            jam_kerja: "",
            jam_libur: "",
            jam_makan: "",

            lembur: "0",
            makan: "0",
            pph: "0",
            bersih: "0",
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

        commit("SET_FORM_IMPORT_UANG_MAKAN", chunked);
        console.log("chunked", chunked);
      };
      reader.readAsArrayBuffer(f);
    },
    async handleSubmit() {
      //   this.$store.dispatch("ImportUangMakan").then((res) => {
      //     if (res) {
      //       this.handleClose();
      //     }
      //   });
    },
  },
};
</script>
