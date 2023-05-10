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
              <div class="">
                <h1 class="mb-0 h5 ml-3 fs-16 fw-bold text-black">
                  Kementrian Keuangan
                </h1>
                <p class="mb-0 h5 ml-3 fs-14 text-muted">
                  Direktorat Jenderal Bea dan Cukai
                </p>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-12">
                <v-text-field
                  outlined
                  dense
                  placeholder="NIP"
                  prepend-inner-icon="mdi-account-outline"
                  v-model="nip"
                  :rules="[
                    (value) => {
                      return genericRequiredRule(value, 'NIP');
                    },
                    (value) => {
                      return genericNumber16Rule(value, 'NIP');
                    },
                  ]"
                />
              </div>
              <div class="col-12">
                <v-text-field
                  outlined
                  dense
                  placeholder="Password"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isShowPassword ? 'text' : 'password'"
                  @click:append="isShowPassword = !isShowPassword"
                  v-model="password"
                  :rules="[
                    (value) => {
                      return genericRequiredRule(value, 'Password');
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
                  Login
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
      isShowPassword: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.app.isLoading;
    },
    nip: {
      get() {
        return this.$store.state.app.login.nip;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN_APP", {
          key: "nip",
          value,
        });
      },
    },
    password: {
      get() {
        return this.$store.state.app.login.password;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN_APP", {
          key: "password",
          value,
        });
      },
    },
  },
  methods: {
    handleSubmit() {
      if (this.$refs.initialReport.validate()) {
        this.$store.dispatch("Login").then((response) => {
          if (response) {
            this.$refs.initialReport.reset();
          }
        });
      }
    },
  },
};
</script>
