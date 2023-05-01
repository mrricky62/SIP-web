<template>
  <v-card class="card" :loading="isLoading">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <p class="card-title fw-medium mb-0">
          History Barang - {{ report.name }}
        </p>
        <v-btn icon @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-sm-6">
          <table class="fs-14 lh-lg">
            <tr
              v-for="(item, i) in [
                { key: 'Name', value: report.name },
                { key: 'Description', value: report.description },
                {
                  key: 'Date',
                  value: moment(report.date).format('YYYY-MM-DD'),
                },
                {
                  key: 'Stock',
                  value: report.stock + ' ' + report.package_unit,
                },
              ]"
              :key="i"
            >
              <td style="min-width: 150px">{{ item.key }}</td>
              <td style="min-width: 20px">:</td>
              <td class="fw-medium">{{ item.value }}</td>
            </tr>
          </table>
        </div>
        <div class="col-sm-6">
          <table class="fs-14 lh-lg">
            <tr
              v-for="(item, i) in [
                { key: 'Post Tarrif', value: report.tarrif_post },
                { key: 'HS Code', value: report.hs_code },
              ]"
              :key="i"
            >
              <td style="min-width: 150px">{{ item.key }}</td>
              <td style="min-width: 20px">:</td>
              <td class="fw-medium">{{ item.value }}</td>
            </tr>
          </table>
        </div>
      </div>

      <br />

      <v-timeline dense clipped>
        <v-timeline-item
          v-for="(item, i) in report.history"
          :key="i"
          class="mb-4"
          fill-dot
          color="primary"
          small
        >
          <p class="fw-medium mb-0">{{ item.description }}</p>
          <p class="text-muted fs-14">
            {{ moment(item.date).format("DD-MM-YYYY") }}
          </p>

          <div class="row">
            <div class="col-sm-4">
              <label class="fs-12 text-muted mb-2">Qty Before</label>
              <v-text-field
                outlined
                dense
                disabled
                v-model="item.qty_before"
                rounded
              />
            </div>
            <div class="col-sm-4">
              <label class="fs-12 text-muted mb-2">Qty Change</label>
              <v-text-field
                outlined
                dense
                disabled
                v-model="item.qty_change"
                rounded
              />
            </div>
            <div class="col-sm-4">
              <label class="fs-12 text-muted mb-2">Qty After</label>
              <v-text-field
                outlined
                dense
                disabled
                v-model="item.qty_after"
                rounded
              />
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "BarangHistory",
  components: {},
  data() {
    return {
      moment,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.barang.isLoading;
    },
    report() {
      return this.$store.state.barang.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalHistory", false);
    },
  },
};
</script>
