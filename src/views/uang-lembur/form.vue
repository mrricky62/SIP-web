<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Uang Makan</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Pegawai</label>
            <v-autocomplete
              placeholder="Pegawai"
              :items="list_pegawai"
              item-text="nama"
              item-value="id"
              v-model="user_id"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Pegawai');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Tanggal</label>
            <date-picker type="month" v-model="tanggal" />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Tanggal SPM</label>
            <date-picker v-model="tanggal_spm" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 col-md-4">
            <label class="mb-2 fw-medium fs-14">Jam Kerja</label>
            <v-text-field
              placeholder="Jam Kerja"
              v-model="jam_kerja"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Jam Kerja');
                },
              ]"
            />
          </div>
          <div class="col-sm-6 col-md-4">
            <label class="mb-2 fw-medium fs-14">Jam Libur</label>
            <v-text-field
              placeholder="Jam Libur"
              v-model="jam_libur"
              type="number"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Jam Libur');
                },
              ]"
            />
          </div>
          <div class="col-sm-6 col-md-4">
            <label class="mb-2 fw-medium fs-14">Jam Makan</label>
            <v-text-field
              placeholder="Jam Makan"
              v-model="jam_makan"
              type="number"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Jam Makan');
                },
              ]"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">Lembur</label>
            <vuetify-money
              placeholder="0"
              v-model="lembur"
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
            <label class="mb-2 fw-medium fs-14">Makan</label>
            <vuetify-money
              placeholder="0"
              v-model="makan"
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
            <label class="mb-2 fw-medium fs-14">PPH</label>
            <vuetify-money
              placeholder="0"
              v-model="pph"
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
            <label class="mb-2 fw-medium fs-14">Bersih</label>
            <vuetify-money
              placeholder="0"
              v-model="bersih"
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
  name: "FormUangLembur",
  mixins: [ValidationRules],
  components: { DatePicker },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.uangLembur.isLoading;
    },
    isUpdate() {
      return this.$store.state.uangLembur.isUpdate;
    },
    list_pegawai() {
      return this.$store.state.uangLembur.list_pegawai;
    },
    user_id: {
      get() {
        return this.$store.state.uangLembur.form.user_id;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "user_id",
          value,
        });
      },
    },
    tanggal: {
      get() {
        return this.$store.state.uangLembur.form.tanggal;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "tanggal",
          value,
        });
      },
    },
    tanggal_spm: {
      get() {
        return this.$store.state.uangLembur.form.tanggal_spm;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "tanggal_spm",
          value,
        });
      },
    },
    jam_kerja: {
      get() {
        return this.$store.state.uangLembur.form.jam_kerja;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "jam_kerja",
          value,
        });
      },
    },
    jam_libur: {
      get() {
        return this.$store.state.uangLembur.form.jam_libur;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "jam_libur",
          value,
        });
      },
    },
    jam_makan: {
      get() {
        return this.$store.state.uangLembur.form.jam_makan;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "jam_makan",
          value,
        });
      },
    },
    lembur: {
      get() {
        return this.$store.state.uangLembur.form.lembur;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "lembur",
          value,
        });
      },
    },
    makan: {
      get() {
        return this.$store.state.uangLembur.form.makan;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "makan",
          value,
        });
      },
    },
    pph: {
      get() {
        return this.$store.state.uangLembur.form.pph;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "pph",
          value,
        });
      },
    },
    bersih: {
      get() {
        return this.$store.state.uangLembur.form.bersih;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_LEMBUR", {
          key: "bersih",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_UANG_LEMBUR");
      this.$store.commit("SET_IS_UPDATE_UANG_LEMBUR", false);

      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          this.$store
            .dispatch("UpdateUangLembur", this.isUpdate)
            .then((res) => {
              if (res) {
                this.handleClose();
              }
            });
          return;
        }
        this.$store.dispatch("CreateUangLembur").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
