<template>
  <div>
    <hr />
    <label class="mb-2 fw-medium fs-14 mb-5"> - Potongan</label>
    <div class="row">
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Hukdis</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_hukdis"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Absen</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_absen"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot PPH</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_pph"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot IWP</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_iwp"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot DKP</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_dkp"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Pinjaman</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_pinjaman"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Tempat Tinggal</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_tmptinggal"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Agama</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_agama"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Darma Wanita</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_darmawanita"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Bapors</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_bapors"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Kasangakatan</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_kasangkatan"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Uang Makan</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_uangmakan"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Lainnya</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_lain"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <label class="mb-2 fs-14">Jumlah Potongan</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="jumlah_potongan"
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
  name: "FormTunjanganPotongan",
  mixins: [ValidationRules],
  data() {
    return {
      model: "",
    };
  },
  computed: {
    pot_hukdis: {
      get() {
        return this.$store.state.tunjangan.form.pot_hukdis;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_hukdis",
          value,
        });
      },
    },
    pot_absen: {
      get() {
        return this.$store.state.tunjangan.form.pot_absen;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_absen",
          value,
        });
      },
    },
    pot_pph: {
      get() {
        return this.$store.state.tunjangan.form.pot_pph;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_pph",
          value,
        });
      },
    },
    // ========================================================================
    pot_iwp: {
      get() {
        return this.$store.state.tunjangan.form.pot_iwp;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_iwp",
          value,
        });
      },
    },
    pot_dkp: {
      get() {
        return this.$store.state.tunjangan.form.pot_dkp;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_dkp",
          value,
        });
      },
    },
    pot_pinjaman: {
      get() {
        return this.$store.state.tunjangan.form.pot_pinjaman;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_pinjaman",
          value,
        });
      },
    },
    pot_tmptinggal: {
      get() {
        return this.$store.state.tunjangan.form.pot_tmptinggal;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_tmptinggal",
          value,
        });
      },
    },
    pot_agama: {
      get() {
        return this.$store.state.tunjangan.form.pot_agama;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_agama",
          value,
        });
      },
    },
    pot_darmawanita: {
      get() {
        return this.$store.state.tunjangan.form.pot_darmawanita;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_darmawanita",
          value,
        });
      },
    },
    pot_bapors: {
      get() {
        return this.$store.state.tunjangan.form.pot_bapors;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_bapors",
          value,
        });
      },
    },
    pot_kasangkatan: {
      get() {
        return this.$store.state.tunjangan.form.pot_kasangkatan;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_kasangkatan",
          value,
        });
      },
    },
    pot_uangmakan: {
      get() {
        return this.$store.state.tunjangan.form.pot_uangmakan;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_uangmakan",
          value,
        });
      },
    },
    pot_lain: {
      get() {
        return this.$store.state.tunjangan.form.pot_lain;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "pot_lain",
          value,
        });
      },
    },
    jumlah_potongan: {
      get() {
        return this.$store.state.tunjangan.form.jumlah_potongan;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "jumlah_potongan",
          value,
        });
      },
    },
  },
};
</script>
