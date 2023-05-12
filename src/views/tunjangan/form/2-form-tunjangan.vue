<template>
  <div>
    <hr />
    <label class="mb-2 fw-medium fs-14 mb-5"> - Tunjangan</label>
    <div class="row">
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Tunj Netto</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_netto"
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
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Permintaan</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="permintaan"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6">
        <label class="mb-2 fs-14">Tunjangan Dibayar</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="tunj_dibayar"
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
  name: "FormTunjanganTunjangan",
  mixins: [ValidationRules],
  data() {
    return {};
  },
  computed: {
    tunj_netto: {
      get() {
        return this.$store.state.tunjangan.form.tunj_netto;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "tunj_netto",
          value,
        });
      },
    },
    tunj_pph: {
      get() {
        return this.$store.state.tunjangan.form.tunj_pph;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "tunj_pph",
          value,
        });
      },
    },
    permintaan: {
      get() {
        return this.$store.state.tunjangan.form.permintaan;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "permintaan",
          value,
        });
      },
    },
    tunj_dibayar: {
      get() {
        return this.$store.state.tunjangan.form.tunj_dibayar;
      },
      set(value) {
        this.$store.commit("SET_FORM_TUNJANGAN", {
          key: "tunj_dibayar",
          value,
        });
      },
    },
  },
};
</script>
