<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form SPD</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">File Documents</label>
            <v-file-input
              outlined
              dense
              v-model="filepath"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'File');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">No ST</label>
            <v-text-field
              placeholder="No ST"
              outlined
              dense
              v-model="no_st"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'No ST');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">No SPD</label>
            <v-text-field
              placeholder="No SPD"
              outlined
              dense
              v-model="no_spd"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'No SPD');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Sifat</label>
            <v-select
              placeholder="Sifat"
              :items="['Dalam Kota', 'Luar Kota']"
              v-model="sifat"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Sifat');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Tujuan</label>
            <v-text-field
              placeholder="Tujuan"
              v-model="tujuan"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Tujuan');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Lama</label>
            <v-text-field
              placeholder="Lama"
              type="number"
              v-model="lama"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Lama');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">Uang Penginapan</label>
            <vuetify-money
              placeholder="0"
              v-model="uang_penginapan"
              :options="{
                prefix: 'Rp ',
                thousands: '.',
                precision: 0,
              }"
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">Uang Transport Pergi</label>
            <vuetify-money
              placeholder="0"
              v-model="uang_transport_pergi"
              :options="{
                prefix: 'Rp ',
                thousands: '.',
                precision: 0,
              }"
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">Uang Transport Pulang</label>
            <vuetify-money
              placeholder="0"
              v-model="uang_transport_pulang"
              :options="{
                prefix: 'Rp ',
                thousands: '.',
                precision: 0,
              }"
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">Uang Transport DPD</label>
            <vuetify-money
              placeholder="0"
              v-model="uang_transport_dpd"
              :options="{
                prefix: 'Rp ',
                thousands: '.',
                precision: 0,
              }"
              outlined
              dense
            />
          </div>
        </div>
        <br />
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
  name: "FormSPD",
  mixins: [ValidationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.spd.isLoading;
    },
    isUpdate() {
      return this.$store.state.spd.isUpdate;
    },
    filepath: {
      get() {
        return this.$store.state.spd.form.filepath;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "filepath",
          value,
        });
      },
    },
    no_st: {
      get() {
        return this.$store.state.spd.form.no_st;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "no_st",
          value,
        });
      },
    },
    no_spd: {
      get() {
        return this.$store.state.spd.form.no_spd;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "no_spd",
          value,
        });
      },
    },
    tujuan: {
      get() {
        return this.$store.state.spd.form.tujuan;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "tujuan",
          value,
        });
      },
    },
    sifat: {
      get() {
        return this.$store.state.spd.form.sifat;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "sifat",
          value,
        });
      },
    },
    lama: {
      get() {
        return this.$store.state.spd.form.lama;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "lama",
          value,
        });
      },
    },
    uang_transport_pergi: {
      get() {
        return this.$store.state.spd.form.uang_transport_pergi;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "uang_transport_pergi",
          value,
        });
      },
    },
    uang_transport_pulang: {
      get() {
        return this.$store.state.spd.form.uang_transport_pulang;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "uang_transport_pulang",
          value,
        });
      },
    },
    uang_transport_dpd: {
      get() {
        return this.$store.state.spd.form.uang_transport_dpd;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "uang_transport_dpd",
          value,
        });
      },
    },
    uang_penginapan: {
      get() {
        return this.$store.state.spd.form.uang_penginapan;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "uang_penginapan",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_SPD");
      this.$store.commit("SET_IS_UPDATE_SPD", false);

      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateUangMakan", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
          return;
        }
        this.$store.dispatch("CreateSPD").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
