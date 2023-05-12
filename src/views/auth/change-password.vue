<template>
  <layout-auth>
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-12 col-sm-7 col-md-5 col-lg-4 col-xl-3">
        <div class="card">
          <v-form
            class="card-body py-10"
            ref="initialReport"
            @submit.prevent="handleSubmit"
          >
            <div class="d-flex align-items-center justify-content-center mb-5">
              <img src="@/assets/logo.png" width="60" alt="logo" />
              <router-link to="/" class="">
                <h1 class="mb-0 h5 ml-3 fs-16 fw-bold text-black">
                  Kementrian Keuangan
                </h1>
                <p class="mb-0 h5 ml-3 fs-14 text-muted">
                  Direktorat Jenderal Bea dan Cukai
                </p>
              </router-link>
            </div>
            <br />
            <br />
            <div class="row">
              <div class="col-12 mb-2">
                <v-text-field
                  outlined
                  dense
                  placeholder="Password Lama"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showOldPassword ? 'text' : 'password'"
                  @click:append="showOldPassword = !showOldPassword"
                  v-model="old_password"
                  :rules="[
                    (value) => {
                      return genericRequiredRule(value, 'Password Lama');
                    },
                  ]"
                />
              </div>
              <div class="col-12 mb-2">
                <v-text-field
                  outlined
                  dense
                  placeholder="Password Baru"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showNewPassword ? 'text' : 'password'"
                  @click:append="showNewPassword = !showNewPassword"
                  v-model="new_password"
                  :rules="[
                    (value) => {
                      return genericRequiredRule(value, 'Password Baru');
                    },
                  ]"
                />
              </div>
              <div class="col-12 mb-2">
                <v-text-field
                  outlined
                  dense
                  placeholder="Konfirmasi Password Baru"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  v-model="confirm_password"
                  :rules="[
                    (value) => {
                      return genericRequiredRule(
                        value,
                        'Konfirmasi Password Baru'
                      );
                    },
                    (value) => {
                      return genericMatchRule(
                        value,
                        'Password Baru',
                        this.new_password
                      );
                    },
                  ]"
                />
              </div>
              <div class="col-12">
                <v-btn
                  class="btn w-100 bg-darkblue text-white"
                  type="submit"
                  :loading="isLoading"
                >
                  Ganti Password
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </layout-auth>
</template>

<script>
import { ValidationRules } from "@/mixins/validation-rules.js";
import layoutAuth from "../../layouts/layout-auth.vue";

export default {
  name: "LoginPage",
  mixins: [ValidationRules],
  components: { layoutAuth },
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.app.isLoading;
    },
    old_password: {
      get() {
        return this.$store.state.app.changePassword.old_password;
      },
      set(value) {
        this.$store.commit("SET_FORM_CHANGE_PASSWORD_APP", {
          key: "old_password",
          value,
        });
      },
    },
    new_password: {
      get() {
        return this.$store.state.app.changePassword.new_password;
      },
      set(value) {
        this.$store.commit("SET_FORM_CHANGE_PASSWORD_APP", {
          key: "new_password",
          value,
        });
      },
    },
    confirm_password: {
      get() {
        return this.$store.state.app.changePassword.confirm_password;
      },
      set(value) {
        this.$store.commit("SET_FORM_CHANGE_PASSWORD_APP", {
          key: "confirm_password",
          value,
        });
      },
    },
  },
  methods: {
    handleSubmit() {
      if (this.$refs.initialReport.validate()) {
        this.$store.dispatch("ChangePassword").then((response) => {
          if (response) {
            this.$refs.initialReport.reset();
          }
        });
      }
    },
  },
};
</script>
