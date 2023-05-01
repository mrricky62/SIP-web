<template>
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-12 col-sm-7 col-md-5 col-lg-4 col-xl-3">
      <div class="card">
        <v-form
          class="card-body py-10"
          ref="initialReport"
          @submit.prevent="handleSubmit"
        >
          <div class="d-flex align-items-center justify-content-center mb-3">
            <img src="@/assets/logo.png" width="60" alt="logo" />
            <!-- <h1 class="mb-0 h5 ml-3 fs-26 fw-bold text-black">
              
            </h1> -->
          </div>
          <br />
          <div class="row">
            <div class="col-12">
              <v-text-field
                outlined
                dense
                placeholder="Username or Email"
                prepend-inner-icon="mdi-account-outline"
                v-model="uid"
                :rules="[
                  (value) => {
                    return genericRequiredRule(value, 'UID');
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
</template>

<script>
import { ValidationRules } from "@/mixins/validation-rules.js";

export default {
  name: "LoginPage",
  mixins: [ValidationRules],
  data() {
    return {
      isShowPassword: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.app.isLoading;
    },
    uid: {
      get() {
        return this.$store.state.app.login.uid;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN_APP", {
          key: "uid",
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
