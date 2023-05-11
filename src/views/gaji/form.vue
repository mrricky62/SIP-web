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
        <div class="row">
          <div class="col-md-4">
            <label class="mb-2 fw-medium fs-14">Tanggal</label>
            <date-picker type="month" v-model="tanggal" />
          </div>
          <div class="col-md-4">
            <label class="mb-2 fw-medium fs-14">KD Golongan</label>
            <v-text-field
              placeholder="KD Golongan"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'KD Golongan');
                },
              ]"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label class="mb-2 fw-medium fs-14">Nama Rekening</label>
            <v-text-field
              placeholder="Nama Rekening"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Nama Rekening');
                },
              ]"
            />
          </div>
          <div class="col-md-4">
            <label class="mb-2 fw-medium fs-14">Nama Bank</label>
            <v-text-field
              placeholder="Nama Bank"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Nama Bank');
                },
              ]"
            />
          </div>
          <div class="col-md-4">
            <label class="mb-2 fw-medium fs-14">No Rekening</label>
            <v-text-field
              placeholder="No Rekening"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'No Rekening');
                },
              ]"
            />
          </div>
          <div class="col-md-4">
            <label class="mb-2 fw-medium fs-14">Gaji Pokok</label>
            <v-text-field
              placeholder="Gaji Pokok"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Gaji Pokok');
                },
              ]"
            />
          </div>
        </div>
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
import DatePicker from "../../components/atoms/date-picker.vue";
import moment from "moment";

export default {
  name: "UserForm",
  mixins: [ValidationRules],
  components: {
    DatePicker,
    FormGajiTunjangan: () => import("./form/form-tunjangan.vue"),
    FormGajiPotongan: () => import("./form/form-potongan.vue"),
  },
  data() {
    return {
      tanggal: moment().format("YYYY-MM"),
    };
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
