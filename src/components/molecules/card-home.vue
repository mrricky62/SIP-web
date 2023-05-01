<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="d-flex align-items-center mr-sm-10">
        <img
          v-if="type == 'pemasukan'"
          src="@/assets/icon/ic_productin.svg"
          alt="Icon Product In"
        />
        <img
          v-if="type == 'pengeluaran'"
          src="@/assets/icon/ic_productout.svg"
          alt="Icon Product Out"
        />

        <div class="ml-5">
          <p class="text-black-50 mb-1 fw-semibold">{{ type }}</p>
          <p class="h3 mb-0 fw-bold">{{ value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardBarang",
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
  },
};
</script>
