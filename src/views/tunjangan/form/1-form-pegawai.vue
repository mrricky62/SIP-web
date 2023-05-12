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
        <label class="mb-2 fw-medium fs-14">Grade</label>
        <v-text-field
          placeholder="Grade"
          v-model="grade"
          outlined
          dense
          :rules="[
            (value) => {
              return genericRequiredRule(value, 'Grade');
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
      <div class="col-md-6">
        <label class="mb-2 fw-medium fs-14">Besaran Tunjangan</label>
        <vuetify-money
          placeholder="0"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
          v-model="besaran_tunjangan"
          outlined
          dense
          :rules="[
            (value) => {
              return genericRequiredRule(value, 'Besaran Tunjangan');
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
  name: "FormTunjanganPegawai",
  mixins: [ValidationRules],
  components: { DatePicker },
  computed: {
    list_pegawai() {
      return this.$store.state.tunjangan.list_pegawai;
    },
    user_id: {
      get() {
        return this.$store.state.tunjangan.form.user_id;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "user_id",
          value,
        });
      },
    },
    tanggal: {
      get() {
        return this.$store.state.tunjangan.form.tanggal;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "tanggal",
          value,
        });
      },
    },
    grade: {
      get() {
        return this.$store.state.tunjangan.form.grade;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "grade",
          value,
        });
      },
    },
    nama_bank: {
      get() {
        return this.$store.state.tunjangan.form.nama_bank;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "nama_bank",
          value,
        });
      },
    },
    no_rek: {
      get() {
        return this.$store.state.tunjangan.form.no_rek;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "no_rek",
          value,
        });
      },
    },
    besaran_tunjangan: {
      get() {
        return this.$store.state.tunjangan.form.besaran_tunjangan;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "besaran_tunjangan",
          value,
        });
      },
    },
  },
};
</script>
