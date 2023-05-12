<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Tunjangan</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <FormTunjanganPegawai />
        <FormTunjanganTunjangan />
        <FormTunjanganPotongan />
        <div class="d-flex justify-content-end">
          <button class="mr-5 text-muted" type="button" @click="handleClose">
            Kembali
          </button>
          <button class="btn bg-darkblue text-white" type="submit">
            Simpan
          </button>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import { ValidationRules } from "@/mixins/validation-rules";

export default {
  name: "FormTunjangan",
  mixins: [ValidationRules],
  components: {
    FormTunjanganPegawai: () => import("./form/1-form-pegawai.vue"),
    FormTunjanganTunjangan: () => import("./form/2-form-tunjangan.vue"),
    FormTunjanganPotongan: () => import("./form/3-form-potongan.vue"),
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.tunjangan.isLoading;
    },
    isUpdate() {
      return this.$store.state.tunjangan.isUpdate;
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_TUNJANGAN");
      this.$store.commit("SET_IS_UPDATE_TUNJANGAN", false);

      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateTunjangan", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
          return;
        }
        this.$store.dispatch("CreateTunjangan").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
