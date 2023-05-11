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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
};
</script>
