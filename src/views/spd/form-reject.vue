<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Tolak SPD</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <label class="mb-2 fw-medium fs-14">Catatan</label>
            <v-textarea
              placeholder="No ST"
              outlined
              dense
              v-model="catatan"
              rows="4"
            />
          </div>
        </div>
        <br />
        <div class="d-flex justify-content-end">
          <button class="mr-5 text-muted" type="button" @click="handleClose">
            Kembali
          </button>
          <button class="btn bg-darkblue text-white" type="submit">
            Tolak
          </button>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import { ValidationRules } from "@/mixins/validation-rules";

export default {
  name: "FormSPD",
  mixins: [ValidationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.spd.isLoading;
    },
    isUpdate() {
      return this.$store.state.spd.isUpdate;
    },
    catatan: {
      get() {
        return this.$store.state.spd.form_reject.catatan;
      },
      set(value) {
        this.$store.commit("SET_FORM_REJECT_SPD", {
          key: "catatan",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_REJECT_SPD");
      this.$store.commit("SET_IS_UPDATE_SPD", false);

      this.$emit("handleModalFormReject", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        this.$store.dispatch("RejectSPD", this.isUpdate).then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
