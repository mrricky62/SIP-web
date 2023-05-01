<template>
  <div class="bg-white py-1 mt-10">
    <div class="container">
      <p class="text-center mb-0 text-muted small">
        Copyright &copy; {{ getYear }} Muhammad Ricky
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      getYear: new Date().getFullYear(),
    };
  },
};
</script>
