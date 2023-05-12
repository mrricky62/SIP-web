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
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Tanggal</label>
            <date-picker type="month" v-model="tanggal" />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Tanggal SPM</label>
            <date-picker v-model="tanggal_spm" />
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
            <label class="mb-2 fw-medium fs-14">Sifat</label>
            <v-text-field
              placeholder="Sifat"
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
            <label class="mb-2 fw-medium fs-14">Uang Harian</label>
            <vuetify-money
              placeholder="0"
              v-model="uang_harian"
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
            <label class="mb-2 fw-medium fs-14">Uang Transport</label>
            <vuetify-money
              placeholder="0"
              v-model="uang_transport"
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
            <label class="mb-2 fw-medium fs-14">Total</label>
            <vuetify-money
              placeholder="0"
              v-model="total"
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
import DatePicker from "../../components/atoms/date-picker.vue";

export default {
  name: "FormSPD",
  mixins: [ValidationRules],
  components: { DatePicker },
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
    tanggal: {
      get() {
        return this.$store.state.spd.form.tanggal;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "tanggal",
          value,
        });
      },
    },
    tanggal_spm: {
      get() {
        return this.$store.state.spd.form.tanggal_spm;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "tanggal_spm",
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
    uang_harian: {
      get() {
        return this.$store.state.spd.form.uang_harian;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "uang_harian",
          value,
        });
      },
    },
    uang_transport: {
      get() {
        return this.$store.state.spd.form.uang_transport;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "uang_transport",
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
    total: {
      get() {
        return this.$store.state.spd.form.total;
      },
      set(value) {
        this.$store.commit("SET_FORM_SPD", {
          key: "total",
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
