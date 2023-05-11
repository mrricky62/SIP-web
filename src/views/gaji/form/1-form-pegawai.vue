<template>
  <div>
    <div class="row">
      <div class="col-md-4">
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
      <div class="col-md-4">
        <label class="mb-2 fw-medium fs-14">Tanggal</label>
        <date-picker type="month" v-model="tanggal" />
      </div>
      <div class="col-md-4">
        <label class="mb-2 fw-medium fs-14">KD Golongan</label>
        <v-text-field
          placeholder="KD Golongan"
          v-model="kdgol"
          outlined
          dense
          :rules="[
            (value) => {
              return genericRequiredRule(value, 'KD Golongan');
            },
          ]"
        />
      </div>
      <div class="col-md-4">
        <label class="mb-2 fw-medium fs-14">Nama Rekening</label>
        <v-text-field
          placeholder="Nama Rekening"
          v-model="nama_rek"
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
          v-model="nama_bank"
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
      <div class="col-md-4">
        <label class="mb-2 fw-medium fs-14">Gaji Pokok</label>
        <v-text-field
          placeholder="Gaji Pokok"
          v-model="gaji_pokok"
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
  </div>
</template>

<script>
import DatePicker from "../../../components/atoms/date-picker.vue";
import { ValidationRules } from "@/mixins/validation-rules";

export default {
  name: "FormGajiPegawai",
  mixins: [ValidationRules],
  components: { DatePicker },
  computed: {
    list_pegawai() {
      return this.$store.state.gaji.list_pegawai;
    },
    user_id: {
      get() {
        return this.$store.state.gaji.form.user_id;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "user_id",
          value,
        });
      },
    },
    tanggal: {
      get() {
        return this.$store.state.gaji.form.tanggal;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tanggal",
          value,
        });
      },
    },
    kdgol: {
      get() {
        return this.$store.state.gaji.form.kdgol;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "kdgol",
          value,
        });
      },
    },
    nama_rek: {
      get() {
        return this.$store.state.gaji.form.nama_rek;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "nama_rek",
          value,
        });
      },
    },
    nama_bank: {
      get() {
        return this.$store.state.gaji.form.nama_bank;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "nama_bank",
          value,
        });
      },
    },
    no_rek: {
      get() {
        return this.$store.state.gaji.form.no_rek;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "no_rek",
          value,
        });
      },
    },
    gaji_pokok: {
      get() {
        return this.$store.state.gaji.form.gaji_pokok;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "gaji_pokok",
          value,
        });
      },
    },
  },
};
</script>
