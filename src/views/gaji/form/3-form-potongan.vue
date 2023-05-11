<template>
  <div>
    <hr />
    <label class="mb-2 fw-medium fs-14 mb-5"> - Potongan</label>
    <div class="row">
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Pfkbul</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_pfkbul"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Pfk2</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_pfk2"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Pfk10</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_pfk10"
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
        <label class="mb-2 fs-14">Pot Swrum</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_swrum"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Kelbtj</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_kelbtj"
          :options="{
            prefix: 'Rp ',
            thousands: '.',
            precision: 0,
          }"
        />
      </div>
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Lain</label>
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
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fs-14">Pot Tabrum</label>
        <vuetify-money
          outlined
          dense
          placeholder="0"
          v-model="pot_tabrum"
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
  name: "FormGajiPotongan",
  mixins: [ValidationRules],
  data() {
    return {
      model: "",
    };
  },
  computed: {
    pot_pfkbul: {
      get() {
        return this.$store.state.gaji.form.pot_pfkbul;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "pot_pfkbul",
          value,
        });
      },
    },
    pot_pfk2: {
      get() {
        return this.$store.state.gaji.form.pot_pfk2;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "pot_pfk2",
          value,
        });
      },
    },
    pot_pfk10: {
      get() {
        return this.$store.state.gaji.form.pot_pfk10;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "pot_pfk10",
          value,
        });
      },
    },
    pot_pph: {
      get() {
        return this.$store.state.gaji.form.pot_pph;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "pot_pph",
          value,
        });
      },
    },
    pot_swrum: {
      get() {
        return this.$store.state.gaji.form.pot_swrum;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "pot_swrum",
          value,
        });
      },
    },
    pot_kelbtj: {
      get() {
        return this.$store.state.gaji.form.pot_kelbtj;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "pot_kelbtj",
          value,
        });
      },
    },
    pot_lain: {
      get() {
        return this.$store.state.gaji.form.pot_lain;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "pot_lain",
          value,
        });
      },
    },
    pot_tabrum: {
      get() {
        return this.$store.state.gaji.form.pot_tabrum;
      },
      set(value) {
        this.$store.commit("SET_FORM_GAJI", {
          key: "pot_tabrum",
          value,
        });
      },
    },
  },
};
</script>
