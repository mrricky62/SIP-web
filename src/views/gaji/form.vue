<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Gaji</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <FormGajiPegawai />
        <FormGajiTunjangan />
        <div class="row">
          <div class="col-sm-6">
            <label class="mb-2 fs-14">Pembulatan</label>
            <vuetify-money
              outlined
              dense
              placeholder="0"
              v-model="model"
              :options="{
                prefix: 'Rp ',
                thousands: '.',
                precision: 0,
              }"
            />
          </div>
        </div>
        <FormGajiPotongan />
        <div class="row">
          <div class="col-sm-6">
            <label class="mb-2 fs-14">Bersih</label>
            <vuetify-money
              outlined
              dense
              placeholder="0"
              v-model="model"
              :options="{
                prefix: 'Rp ',
                thousands: '.',
                precision: 0,
              }"
            />
          </div>
        </div>
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
  name: "UserForm",
  mixins: [ValidationRules],
  components: {
    FormGajiPegawai: () => import("./form/1-form-pegawai.vue"),
    FormGajiTunjangan: () => import("./form/2-form-tunjangan.vue"),
    FormGajiPotongan: () => import("./form/3-form-potongan.vue"),
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.pegawai.isLoading;
    },
    isUpdate() {
      return this.$store.state.pegawai.isUpdate;
    },
    nip: {
      get() {
        return this.$store.state.pegawai.form.nip;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "nip",
          value,
        });
      },
    },
    nama: {
      get() {
        return this.$store.state.pegawai.form.nama;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "nama",
          value,
        });
      },
    },
    pangkat: {
      get() {
        return this.$store.state.pegawai.form.pangkat;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "pangkat",
          value,
        });
      },
    },
    golongan: {
      get() {
        return this.$store.state.pegawai.form.golongan;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "golongan",
          value,
        });
      },
    },
    password: {
      get() {
        return this.$store.state.pegawai.form.password;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "password",
          value,
        });
      },
    },
    is_admin: {
      get() {
        return this.$store.state.pegawai.form.is_admin;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "is_admin",
          value,
        });
      },
    },
    is_active: {
      get() {
        return this.$store.state.pegawai.form.is_active;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "is_active",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_PEGAWAI");
      this.$store.commit("SET_IS_UPDATE_PEGAWAI", false);

      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateUser", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
          return;
        }
        this.$store.dispatch("CreateUser").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
