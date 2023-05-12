<template>
  <nav class="navbar bg-white">
    <div class="container py-1">
      <div class="navbar-brand">
        <div class="d-flex align-items-center text-black">
          <img src="@/assets/logo.png" width="50" alt="logo" />
          <div class="d-none d-sm-block">
            <h1 class="mb-0 h5 ml-3 fw-bold fs-16">Kementrian Keuangan</h1>
            <p class="mb-0 ml-3 fw-medium text-muted fs-14">
              Direktorat Jenderal Bea dan Cukai
            </p>
          </div>
        </div>
      </div>

      <div class="dropdown my-auto">
        <a
          class="flex text-decoration-none"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div class="d-flex align-items-center">
            <img
              :src="
                'https://ui-avatars.com/api/?background=312E68&color=fff&font-size=0.4&name=' +
                user.nama
              "
              width="40"
              height="40"
              alt="pp"
              class="rounded-circle mr-3"
            />
            <div class="d-none d-sm-block">
              <p class="mb-0 fw-medium text-black">
                {{ user.nama }}
              </p>
              <p class="mb-0 small text-muted">
                {{ user.pangkat }} - {{ user.golongan }}
              </p>
            </div>
          </div>
        </a>

        <ul class="dropdown-menu dropdown-menu-end pl-0">
          <li>
            <p class="dropdown-item text-black small disabled mb-0" href="#">
              <i class="fa-solid fa-circle text-success small mr-1"></i>
              Status Active
            </p>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <router-link
              to="/change-password"
              class="dropdown-item text-black small mb-2"
            >
              <i class="fa-solid fa-lock mr-1"></i>
              Ganti Password
            </router-link>
          </li>
          <li>
            <a class="dropdown-item text-danger small" @click="handleLogout">
              <i class="fa-solid fa-arrow-right-from-bracket mr-1"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppTopbarHeader",
  data() {
    return {
      //
    };
  },
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$store.commit("SET_USER_APP", "");
      this.$store.commit("SET_TOKEN_APP", "");

      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped></style>
