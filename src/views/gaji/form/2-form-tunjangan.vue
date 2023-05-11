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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
          v-model="model"
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
  name: "FormGajiTunjangan",
  mixins: [ValidationRules],
  data() {
    return {
      model: "",
    };
  },
};
</script>
