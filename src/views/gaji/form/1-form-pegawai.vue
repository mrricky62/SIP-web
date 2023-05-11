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
  },
};
</script>
