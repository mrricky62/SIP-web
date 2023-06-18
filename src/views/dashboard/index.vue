<template>
  <layout-app>
    <div class="card border-0">
      <div class="card-body p-4 p-md-5">
        <h4>Selamat Datang {{ user.nama }} 👋</h4>
        <p style="font-size: 18px">
          Pada Sistem Informasi Penghasilan Pegawai<br />
          Sistem ini menyediakan informasi penghasilan bagi pegawai KPU Bea dan
          Cukai Tipe B Batam<br />
          Jika ada informasi yang tidak sesuai dengan seharusnya, segera hubungi
          staf Bagian Keuangan
        </p>
      </div>
    </div>
  </layout-app>
</template>

<script>
import LayoutApp from "../../layouts/layout-app.vue";

export default {
  name: "Home",
  components: {
    LayoutApp,
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.dashboard.isLoading;
    },
    user() {
      return this.$store.state.app.user;
    },
  },
  mounted() {
    this.$store.dispatch("FetchDashboard");
  },
};
</script>
