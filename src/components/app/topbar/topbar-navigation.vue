<template>
  <nav class="navbar navbar-expand-xl border-0 bg-darkblue">
    <div class="container py-1">
      <button
        class="ml-auto p-2 d-block d-md-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i class="fa-solid fa-bars fs-20 text-white"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav pl-0">
          <li
            v-for="(nav, i) in navItems"
            :key="i"
            :class="`nav-item mr-sm-7 ${nav.children ? 'dropdown' : ''}`"
          >
            <router-link :class="`${aClass}`" :to="nav.path">
              <i :class="nav.icon"></i>
              <span class="ms-3">{{ nav.title }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div
        class="offcanvas offcanvas-end d-block d-md-none bg-darkblue"
        tabindex="-1"
        id="offcanvasRight"
        style="width: 300px"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">
            <!-- <div class="d-flex align-items-center text-black">
              <img src="@/assets/logo.svg" width="60" alt="logo" />
            </div> -->
          </h5>
          <button type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <i class="fa-solid fa-xmark fs-24 text-white"></i>
          </button>
        </div>
        <div class="offcanvas-body">
          <ul class="list-unstyled pl-0">
            <li v-for="(nav, i) in navItems" :key="i">
              <router-link :class="`${aClass} py-2 mb-1`" :to="nav.path">
                <i :class="nav.icon"></i>
                <span class="ms-3">{{ nav.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppTopbarNavigation",
  data() {
    return {
      aClass: "nav-link px-3 text-white fs-14 fw-light text-white-50",
      navItems: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: "fa-solid fa-house",
          role: ["admin", "user"],
        },
        {
          title: "Gaji",
          path: "/gaji",
          icon: "fa-solid fa-money-bill",
          role: ["admin", "user"],
        },
        {
          title: "Tunjangan",
          path: "/tunjangan",
          icon: "fa-solid fa-money-bill-1",
          role: ["admin", "user"],
        },
        {
          title: "Uang Makan",
          path: "/uang-makan",
          icon: "fa-solid fa-money-bill-wave",
          role: ["admin", "user"],
        },
        {
          title: "SPD",
          path: "/spd",
          icon: "fa-solid fa-plane-departure",
          role: ["admin", "user"],
        },
        {
          title: "Uang Lembur",
          path: "/uang-lembur",
          icon: "fa-solid fa-money-check",
          role: ["admin", "user"],
        },
        {
          title: "Pegawai",
          path: "/pegawai",
          icon: "fa-solid fa-users",
          role: ["admin"],
        },
        {
          title: "Summary",
          path: "/summary",
          icon: "fa-solid fa-file-alt",
          role: ["user"],
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
  methods: {
    setActiveClass(path) {
      return this.$route.path.includes(path) ? "router-link-exact-active" : "";
    },
  },
  mounted() {
    let isAdmin = this.user.is_admin;

    this.navItems = this.navItems.filter((item) => {
      return item.role.includes(isAdmin ? "admin" : "user");
    });
  },
};
</script>

<style lang="scss">
.router-link-exact-active {
  font-weight: 500 !important;
  border-radius: 5px;
  color: white !important;
}
.dropdown-item {
  &:active,
  &:hover,
  &:focus,
  &:after {
    background: none;
  }
}

.dropdown:hover > .dropdown-menu {
  display: block;
}

.dropdown > .dropdown-toggle:active {
  /*Without this, clicking will make it sticky*/
  pointer-events: none;
}
</style>
