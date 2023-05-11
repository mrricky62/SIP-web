<template>
  <div>
    <hr />
    <label class="mb-2 fw-medium fs-14 mb-5"> - Tunjangan</label>
    <div class="row">
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Istri</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_istri"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Anak</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_anak"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj PNS</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_pns"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Struk</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_struk"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Fungs</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_fungs"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Daerah</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_daerah"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Pencil</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_pencil"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj TJLain</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_tjlain"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Kompen</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_kompen"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Beras</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_beras"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj PPH</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_pph"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationRules } from "@/mixins/validation-rules";

export default {
  name: "FormGajiTunjangan",
  mixins: [ValidationRules],
  data() {
    return {};
  },
  computed: {
    tunj_istri: {
      get() {
        return this.$store.state.gaji.form.tunj_istri;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_istri",
          value,
        });
      },
    },
    tunj_anak: {
      get() {
        return this.$store.state.gaji.form.tunj_anak;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_anak",
          value,
        });
      },
    },
    tunj_pns: {
      get() {
        return this.$store.state.gaji.form.tunj_pns;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_pns",
          value,
        });
      },
    },
    tunj_struk: {
      get() {
        return this.$store.state.gaji.form.tunj_struk;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_struk",
          value,
        });
      },
    },
    tunj_fungs: {
      get() {
        return this.$store.state.gaji.form.tunj_fungs;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_fungs",
          value,
        });
      },
    },
    tunj_daerah: {
      get() {
        return this.$store.state.gaji.form.tunj_daerah;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_daerah",
          value,
        });
      },
    },
    tunj_pencil: {
      get() {
        return this.$store.state.gaji.form.tunj_pencil;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_pencil",
          value,
        });
      },
    },
    tunj_tjlain: {
      get() {
        return this.$store.state.gaji.form.tunj_tjlain;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_tjlain",
          value,
        });
      },
    },
    tunj_kompen: {
      get() {
        return this.$store.state.gaji.form.tunj_kompen;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_kompen",
          value,
        });
      },
    },
    tunj_beras: {
      get() {
        return this.$store.state.gaji.form.tunj_beras;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_beras",
          value,
        });
      },
    },
    tunj_pph: {
      get() {
        return this.$store.state.gaji.form.tunj_pph;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "tunj_pph",
          value,
        });
      },
    },
  },
};
</script>
