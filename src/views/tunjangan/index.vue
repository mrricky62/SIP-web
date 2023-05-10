<template>
  <layout-app>
    <HeaderTitle title="Home" subtitle="Data Barang" />
    <v-btn
      class="btn text-white fw-normal bg-darkblue mb-3"
      @click="handleModalForm(true)"
    >
      <i class="fa fa-plus"></i>
      Add Barang
    </v-btn>
    <div class="card p-3 border-0">
      <div class="card-body">
        <div class="d-flex justify-content-end">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
            dense
            outlined
            class="search-input"
            v-model="optionsTable.search"
          ></v-text-field>
        </div>
        <div class="p-3">
          <v-data-table
            :headers="headers"
            :items="reports"
            :loading="isLoading"
            :options.sync="optionsTable"
            :search="optionsTable.search"
          >
            <template v-slot:[`item.date`]="{ item }">
              <span>{{ moment(item.date).format("YYYY-MM-DD") }}</span>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    class="btn btn-outline-primary py-4"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span class="fw-light mr-1">Action</span>
                    <i class="fa-solid fa-chevron-down small"></i>
                  </v-btn>
                </template>
                <v-list min-width="150">
                  <v-list-item @click="handleModalHistory(true, item.id)">
                    <v-list-item-title class="text-primary fs-12">
                      <i class="fa-regular fa-clock small mr-2"></i>
                      <span>History</span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="handleEdit(item.id)">
                    <v-list-item-title class="text-primary fs-12">
                      <i class="fas fa-edit small mr-2"></i>
                      <span>Edit</span>
                    </v-list-item-title>
                  </v-list-item>
                  <!-- <v-list-item @click="handleDelete(item.id)">
                    <v-list-item-title class="text-primary fs-12">
                      <i class="fas fa-trash small mr-2"></i>
                      <span>Delete</span>
                    </v-list-item-title>
                  </v-list-item> -->
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>

    <v-dialog v-if="modalForm" v-model="modalForm" max-width="800" persistent>
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
    <v-dialog
      v-if="modalHistory"
      v-model="modalHistory"
      max-width="800"
      persistent
    >
      <History @handleModalHistory="handleModalHistory" />
    </v-dialog>
  </layout-app>
</template>

<script>
import moment from "moment";
import LayoutApp from "../../layouts/layout-app.vue";

export default {
  name: "TunjanganPage",
  components: {
    LayoutApp,
    HeaderTitle: () => import("@/components/molecules/header-title.vue"),
    Form: () => import("./form.vue"),
    History: () => import("./history.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "Date", value: "date" },
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Post Tarif", value: "tarrif_post" },
        { text: "Netto,Bruto", value: "weight" },
        { text: "Stock", value: "stock" },
        { text: "Satuan Kemasan", value: "package_unit" },
        { text: "Action", value: "action", sortable: false, align: "right" },
      ],
      moment,
      modalForm: false,
      modalHistory: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.barang.isLoading;
    },
    reports() {
      return this.$store.state.barang.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.barang.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_BARANG", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      this.modalForm = value;
    },
    handleModalHistory(value, id) {
      if (value) this.$store.dispatch("FetchBarangHistory", id);
      this.modalHistory = value;
    },
    handleEdit(id) {
      this.$store.dispatch("SetFormBarang", id);
      this.$store.commit("SET_IS_UPDATE_BARANG", id);
      this.handleModalForm(true);
    },
  },
  mounted() {
    this.$store.dispatch("FetchBarang");
  },
};
</script>
