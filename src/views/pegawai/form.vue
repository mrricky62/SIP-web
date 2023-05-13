<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Pegawai</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <v-switch
              inset
              dense
              v-model="is_active"
              label="Is Active"
            ></v-switch>
          </div>
          <div class="col-md-6">
            <v-switch
              inset
              dense
              v-model="is_admin"
              label="Is Admin"
            ></v-switch>
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">NIP</label>
            <v-text-field
              placeholder="NIP"
              outlined
              dense
              v-model="nip"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'NIP');
                },
                (value) => {
                  return genericNumber18Rule(value, 'NIP');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Nama</label>
            <v-text-field
              placeholder="Nama"
              outlined
              dense
              v-model="nama"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Nama');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Pangkat</label>
            <v-text-field
              placeholder="Pangkat"
              outlined
              dense
              v-model="pangkat"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Pangkat');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Golongan</label>
            <v-text-field
              placeholder="Golongan"
              outlined
              dense
              v-model="golongan"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Golongan');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Password</label>
            <v-text-field
              placeholder="Password"
              outlined
              dense
              v-model="password"
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="isShowPassword ? 'text' : 'password'"
              @click:append="isShowPassword = !isShowPassword"
              :rules="[
                isUpdate
                  ? () => {}
                  : (value) => {
                      return genericRequiredRule(value, 'Password');
                    },
              ]"
            />
          </div>
        </div>
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
  components: {},
  data() {
    return {
      isShowPassword: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.pegawai.isLoading;
    },
    isUpdate() {
      return this.$store.state.pegawai.isUpdate;
    },
    nip: {
      get() {
        return this.$store.state.pegawai.form.nip;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "nip",
          value,
        });
      },
    },
    nama: {
      get() {
        return this.$store.state.pegawai.form.nama;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "nama",
          value,
        });
      },
    },
    pangkat: {
      get() {
        return this.$store.state.pegawai.form.pangkat;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "pangkat",
          value,
        });
      },
    },
    golongan: {
      get() {
        return this.$store.state.pegawai.form.golongan;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "golongan",
          value,
        });
      },
    },
    password: {
      get() {
        return this.$store.state.pegawai.form.password;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "password",
          value,
        });
      },
    },
    is_admin: {
      get() {
        return this.$store.state.pegawai.form.is_admin;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "is_admin",
          value,
        });
      },
    },
    is_active: {
      get() {
        return this.$store.state.pegawai.form.is_active;
      },
      set(value) {
        this.$store.commit("SET_FORM_PEGAWAI", {
          key: "is_active",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_PEGAWAI");
      this.$store.commit("SET_IS_UPDATE_PEGAWAI", false);

      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateUser", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
          return;
        }
        this.$store.dispatch("CreateUser").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
