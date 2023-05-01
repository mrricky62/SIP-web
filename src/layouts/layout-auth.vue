<template>
  <v-app>
    <v-main class="bg-auth px-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style lang="scss" scoped>
.bg-auth {
  background: #312e68;
}
</style>
