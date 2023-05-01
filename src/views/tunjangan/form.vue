<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Barang</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Name</label>
            <v-text-field
              placeholder="Name"
              outlined
              dense
              v-model="name"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Name');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Date</label>
            <DatePicker v-model="date" />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">CBM</label>
            <v-text-field
              placeholder="CBM"
              outlined
              dense
              type="number"
              v-model="weight"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'CBM');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Satuan Kemasan</label>
            <v-text-field
              placeholder="Satuan Kemasan"
              outlined
              dense
              v-model="package_unit"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Satuan Kemasan');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Pos Tarif</label>
            <v-text-field
              placeholder="Pos Tarif"
              outlined
              dense
              v-model="tarrif_post"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Pos Tarif');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">HS Code</label>
            <v-text-field
              placeholder="HS Code"
              outlined
              dense
              v-model="hs_code"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'HS Code');
                },
              ]"
            />
          </div>
          <div class="col-md-12">
            <label class="mb-2 fw-medium fs-14">Uraian Barang</label>
            <v-textarea
              placeholder="Uraian Barang"
              rows="3"
              outlined
              dense
              v-model="description"
            />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-end">
          <button class="mr-5 text-muted" type="button" @click="handleClose">
            Kembali
          </button>
          <button class="btn bg-darkblue text-white" type="submit">
            Simpan
          </button>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import { ValidationRules } from "@/mixins/validation-rules";

export default {
  name: "UserForm",
  mixins: [ValidationRules],
  components: {
    DatePicker: () => import("@/components/atoms/date-picker.vue"),
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.barang.isLoading;
    },
    isUpdate() {
      return this.$store.state.barang.isUpdate;
    },
    list_role() {
      return this.$store.state.barang.list_role;
    },
    name: {
      get() {
        return this.$store.state.barang.form.name;
      },
      set(value) {
        this.$store.commit("SET_FORM_BARANG", {
          key: "name",
          value,
        });
      },
    },
    date: {
      get() {
        return this.$store.state.barang.form.date;
      },
      set(value) {
        this.$store.commit("SET_FORM_BARANG", {
          key: "date",
          value,
        });
      },
    },
    description: {
      get() {
        return this.$store.state.barang.form.description;
      },
      set(value) {
        this.$store.commit("SET_FORM_BARANG", {
          key: "description",
          value,
        });
      },
    },
    weight: {
      get() {
        return this.$store.state.barang.form.weight;
      },
      set(value) {
        this.$store.commit("SET_FORM_BARANG", {
          key: "weight",
          value,
        });
      },
    },
    package_unit: {
      get() {
        return this.$store.state.barang.form.package_unit;
      },
      set(value) {
        this.$store.commit("SET_FORM_BARANG", {
          key: "package_unit",
          value,
        });
      },
    },
    tarrif_post: {
      get() {
        return this.$store.state.barang.form.tarrif_post;
      },
      set(value) {
        this.$store.commit("SET_FORM_BARANG", {
          key: "tarrif_post",
          value,
        });
      },
    },
    hs_code: {
      get() {
        return this.$store.state.barang.form.hs_code;
      },
      set(value) {
        this.$store.commit("SET_FORM_BARANG", {
          key: "hs_code",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_BARANG");
      this.$store.commit("SET_IS_UPDATE_BARANG", false);

      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateBarang", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
          return;
        }
        this.$store.dispatch("CreateBarang").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
