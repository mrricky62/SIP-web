<template>
  <layout-app>
    <div class="card border-0">
      <div class="card-body p-4 p-md-5">
        <h4>Welcome 👋</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem suscipit repudiandae soluta fuga quam facilis quisquam
          odit alias, modi facere et excepturi sapiente ipsam. Nisi impedit
          earum incidunt laboriosam ipsam.
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
  },
  mounted() {
    this.$store.dispatch("FetchDashboard");
  },
};
</script>
