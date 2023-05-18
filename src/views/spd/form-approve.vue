<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Approve SPD</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
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
            <label class="mb-2 fw-medium fs-14">Uang Harian</label>
            <vuetify-money
              placeholder="0"
              v-model="uang_harian"
              @input="calculateTotal"
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
              @input="calculateTotal"
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
              @input="calculateTotal"
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
              @input="calculateTotal"
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
            <label class="mb-2 fw-medium fs-14"
              >Daftar Pengeluaran Riil (DPR)</label
            >
            <vuetify-money
              placeholder="0"
              v-model="uang_transport_dpd"
              @input="calculateTotal"
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
            Approve
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
    no_st: {
      get() {
        return this.$store.state.spd.form_approve.no_st;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "no_st",
          value,
        });
      },
    },
    no_spd: {
      get() {
        return this.$store.state.spd.form_approve.no_spd;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "no_spd",
          value,
        });
      },
    },
    tujuan: {
      get() {
        return this.$store.state.spd.form_approve.tujuan;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "tujuan",
          value,
        });
      },
    },
    sifat: {
      get() {
        return this.$store.state.spd.form_approve.sifat;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "sifat",
          value,
        });
      },
    },
    lama: {
      get() {
        return this.$store.state.spd.form_approve.lama;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "lama",
          value,
        });
      },
    },
    uang_harian: {
      get() {
        return this.$store.state.spd.form_approve.uang_harian;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "uang_harian",
          value,
        });
      },
    },
    uang_transport_pergi: {
      get() {
        return this.$store.state.spd.form_approve.uang_transport_pergi;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "uang_transport_pergi",
          value,
        });
      },
    },
    uang_transport_pulang: {
      get() {
        return this.$store.state.spd.form_approve.uang_transport_pulang;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "uang_transport_pulang",
          value,
        });
      },
    },
    uang_transport_dpd: {
      get() {
        return this.$store.state.spd.form_approve.uang_transport_dpd;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "uang_transport_dpd",
          value,
        });
      },
    },
    uang_penginapan: {
      get() {
        return this.$store.state.spd.form_approve.uang_penginapan;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "uang_penginapan",
          value,
        });
      },
    },
    total: {
      get() {
        return this.$store.state.spd.form_approve.total;
      },
      set(value) {
        this.$store.commit("SET_FORM_APPROVE_SPD", {
          key: "total",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_APPROVE_SPD");
      this.$store.commit("SET_IS_UPDATE_SPD", false);

      this.$emit("handleModalFormApprove", false);
    },
    calculateTotal() {
      const total =
        +this.uang_harian +
        +this.uang_penginapan +
        +this.uang_transport_pergi +
        +this.uang_transport_pulang +
        +this.uang_transport_dpd;
      this.total = total;
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        this.$store.dispatch("ApproveSPD", this.isUpdate).then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
