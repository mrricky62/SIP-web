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
            <label class="mb-2 fw-medium fs-14">Kdgol</label>
            <v-text-field
              placeholder="Kdgol"
              v-model="kdgol"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Kdgol');
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
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">No Rekening</label>
            <v-text-field
              placeholder="No Rekening"
              v-model="no_rek"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'No Rekening');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">Jumlah Hari</label>
            <v-text-field
              placeholder="Jumlah Hari"
              v-model="jml_hari"
              type="number"
              outlined
              dense
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Jumlah Hari');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">Tarif</label>
            <vuetify-money
              placeholder="0"
              v-model="tarif"
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
            <label class="mb-2 fw-medium fs-14">Kotor</label>
            <vuetify-money
              placeholder="0"
              v-model="kotor"
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
  name: "FormUangMakan",
  mixins: [ValidationRules],
  components: { DatePicker },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.uangMakan.isLoading;
    },
    isUpdate() {
      return this.$store.state.uangMakan.isUpdate;
    },
    list_pegawai() {
      return this.$store.state.uangMakan.list_pegawai;
    },
    user_id: {
      get() {
        return this.$store.state.uangMakan.form.user_id;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "user_id",
          value,
        });
      },
    },
    tanggal: {
      get() {
        return this.$store.state.uangMakan.form.tanggal;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "tanggal",
          value,
        });
      },
    },
    tanggal_spm: {
      get() {
        return this.$store.state.uangMakan.form.tanggal_spm;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "tanggal_spm",
          value,
        });
      },
    },
    kdgol: {
      get() {
        return this.$store.state.uangMakan.form.kdgol;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "kdgol",
          value,
        });
      },
    },
    jml_hari: {
      get() {
        return this.$store.state.uangMakan.form.jml_hari;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "jml_hari",
          value,
        });
      },
    },
    tarif: {
      get() {
        return this.$store.state.uangMakan.form.tarif;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "tarif",
          value,
        });
      },
    },
    kotor: {
      get() {
        return this.$store.state.uangMakan.form.kotor;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "kotor",
          value,
        });
      },
    },
    pph: {
      get() {
        return this.$store.state.uangMakan.form.pph;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "pph",
          value,
        });
      },
    },
    bersih: {
      get() {
        return this.$store.state.uangMakan.form.bersih;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "bersih",
          value,
        });
      },
    },
    no_rek: {
      get() {
        return this.$store.state.uangMakan.form.no_rek;
      },
      set(value) {
        this.$store.commit("SET_FORM_UANG_MAKAN", {
          key: "no_rek",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_UANG_MAKAN");
      this.$store.commit("SET_IS_UPDATE_UANG_MAKAN", false);

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
        this.$store.dispatch("CreateUangMakan").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
