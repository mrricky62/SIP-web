<template>
  <div>
    <hr />
    <label class="mb-2 fw-medium fs-14 mb-5"> - Tunjangan</label>
    <div class="row">
      <div class="col-sm-6 col-md-4">
        <label class="mb-2 fw-medium fs-14">Tujangan Istri</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan Anak</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan PNS</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan Struk</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan Fungs</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan Daerah</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan Pencil</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan TJLain</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan Kompen</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan Beras</label>
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
        <label class="mb-2 fw-medium fs-14">Tujangan PPH</label>
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
        <label class="mb-2 fw-medium fs-14">Pembulatan</label>
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
