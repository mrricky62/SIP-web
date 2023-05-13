<template>
  <form @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Import Gaji</p>
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
  name: "FormImportGaji",
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
            tanggal: `${iterator.tahun}-${iterator.bulan}`,
            kdgol: iterator.kdgol,
            nama_rek: iterator.nmrek,
            nama_bank: iterator.nm_bank,
            no_rek: iterator.rekening,
            gaji_pokok: iterator.gjpokok,

            tunj_istri: iterator.tjistri,
            tunj_anak: iterator.tjanak,
            tunj_pns: iterator.tjupns,
            tunj_struk: iterator.tjstruk,
            tunj_fungs: iterator.tjfungs,
            tunj_daerah: iterator.tjdaerah,
            tunj_pencil: iterator.tjpencil,
            tunj_tjlain: iterator.tjlain,
            tunj_kompen: iterator.tjkompen,
            tunj_beras: iterator.tjberas,
            tunj_pph: iterator.tjpph,

            pembulatan: iterator.pembul,

            pot_pfkbul: iterator.potpfkbul,
            pot_pfk2: iterator.potpfk2,
            pot_pfk10: iterator.potpfk10,
            pot_pph: iterator.potpph,
            pot_swrum: iterator.potswrum,
            pot_kelbtj: iterator.potkelbtj,
            pot_lain: iterator.kdgol,
            pot_tabrum: iterator.pottabrum,

            bersih: iterator.bersih,
          });
        }

        console.log("payload", payload);
        commit("SET_FORM_IMPORT_GAJI", payload);
      };
      reader.readAsArrayBuffer(f);
    },
    async handleSubmit() {
      // this.$store.dispatch("CreateGaji").then((res) => {
      //   if (res) {
      //     this.handleClose();
      //   }
      // });
      console.log("submit");
    },
  },
};
</script>
