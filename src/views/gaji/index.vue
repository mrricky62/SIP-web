<template>
  <layout-app>
    <HeaderTitle title="Dashboard" subtitle="Data Gaji" />
    <v-btn
      class="btn text-white fw-normal bg-darkblue mb-3"
      @click="handleModalForm(true)"
    >
      <i class="fa fa-plus"></i>
      Add Gaji
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
            <template v-slot:[`item.is_admin`]="{ item }">
              <v-chip
                small
                :color="item.is_admin ? 'success' : 'error'"
                text-color="white"
              >
                {{ item.is_admin ? "Yes" : "No" }}
              </v-chip>
            </template>
            <template v-slot:[`item.is_active`]="{ item }">
              <v-chip
                small
                :color="item.is_active ? 'success' : 'error'"
                text-color="white"
              >
                {{ item.is_active ? "Yes" : "No" }}
              </v-chip>
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

    <v-dialog v-if="modalForm" v-model="modalForm" max-width="1200" persistent>
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
  </layout-app>
</template>

<script>
import moment from "moment";
import LayoutApp from "../../layouts/layout-app.vue";

export default {
  name: "GajiPage",
  components: {
    LayoutApp,
    HeaderTitle: () => import("@/components/molecules/header-title.vue"),
    Form: () => import("./form.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "NIP", value: "nip" },
        { text: "Nama", value: "nama" },
        { text: "Pangkat", value: "pangkat" },
        { text: "Golongan", value: "golongan" },
        { text: "Is Admin", value: "is_admin" },
        { text: "Is Active", value: "is_active" },
        { text: "Action", value: "action", sortable: false, align: "right" },
      ],
      moment,
      modalForm: false,
      modalHistory: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.pegawai.isLoading;
    },
    reports() {
      return this.$store.state.pegawai.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.pegawai.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_PEGAWAI", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if(value) this.$store.dispatch("FetchBeforeFormGaji");
      this.modalForm = value;
    },
    handleEdit(id) {
      this.$store.dispatch("SetFormUser", id);
      this.$store.commit("SET_IS_UPDATE_PEGAWAI", id);

      this.handleModalForm(true);
    },
  },
  mounted() {
    this.$store.dispatch("FetchPegawai");
  },
};
</script>
