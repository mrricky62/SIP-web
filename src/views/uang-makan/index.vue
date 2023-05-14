<template>
  <layout-app>
    <HeaderTitle title="Dashboard" subtitle="Uang Makan" />
    <v-btn
      class="btn text-white fw-normal bg-darkblue mb-3 mr-3"
      v-if="isAdmin"
      @click="handleModalForm(true)"
    >
      <i class="fa fa-plus"></i>
      Add Uang Makan
    </v-btn>
    <v-btn
      class="btn text-white fw-normal bg-darkblue mb-3"
      v-if="isAdmin"
      @click="handleModalFormImport(true)"
    >
      <i class="fa fa-file-excel mr-1"></i>
      Import Excel
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
            <template v-slot:[`item.bersih`]="{ item }">
              {{ format3Digit(item.bersih) }}
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
                  <v-list-item @click="handleModalDetail(true, item.id)">
                    <v-list-item-title class="text-primary fs-12">
                      <i class="fas fa-eye small mr-2"></i>
                      <span>Detail</span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="handleEdit(item.id)" v-if="isAdmin">
                    <v-list-item-title class="text-primary fs-12">
                      <i class="fas fa-edit small mr-2"></i>
                      <span>Edit</span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="handleDelete(item.id)" v-if="isAdmin">
                    <v-list-item-title class="text-primary fs-12">
                      <i class="fas fa-trash small mr-2"></i>
                      <span>Delete</span>
                    </v-list-item-title>
                  </v-list-item>
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
      v-if="modalFormImport"
      v-model="modalFormImport"
      max-width="600"
      persistent
    >
      <FormImport @handleModalFormImport="handleModalFormImport" />
    </v-dialog>
    <v-dialog
      v-if="modalDetail"
      v-model="modalDetail"
      max-width="800"
      persistent
    >
      <Detail @handleModalDetail="handleModalDetail" />
    </v-dialog>
  </layout-app>
</template>

<script>
import LayoutApp from "../../layouts/layout-app.vue";
import moment from "moment";
import format3Digit from "@/utils/format-3digit.js";
import Swal from "sweetalert2";

export default {
  name: "UangMakanPage",
  components: {
    LayoutApp,
    HeaderTitle: () => import("@/components/molecules/header-title.vue"),
    Form: () => import("./form.vue"),
    FormImport: () => import("./form-import.vue"),
    Detail: () => import("./detail.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "NIP", value: "user.nip" },
        { text: "Bulan", value: "bulan" },
        { text: "Tahun", value: "tahun" },
        { text: "Jumlah Hari", value: "jml_hari" },
        { text: "Nilai", value: "bersih" },
        { text: "Tanggal SPM", value: "tanggal_spm" },
        { text: "Action", value: "action", sortable: false, align: "right" },
      ],
      format3Digit,
      moment,
      modalForm: false,
      modalFormImport: false,
      modalDetail: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.uangMakan.isLoading;
    },
    reports() {
      return this.$store.state.uangMakan.reports;
    },
    isAdmin() {
      return this.$store.state.app.user.is_admin;
    },
    optionsTable: {
      get() {
        return this.$store.state.uangMakan.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_UANG_MAKAN", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if (value) this.$store.dispatch("FetchBeforeFormUangMakan");
      this.modalForm = value;
    },
    handleModalFormImport(value) {
      this.modalFormImport = value;
    },
    handleEdit(id) {
      this.$store.dispatch("SetFormUpdateUangMakan", id);
      this.$store.commit("SET_IS_UPDATE_UANG_MAKAN", id);

      this.handleModalForm(true);
    },
    handleModalDetail(value, id) {
      if (value) this.$store.dispatch("FetchUangMakanDetail", id);
      this.modalDetail = value;
    },
    handleDelete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("DeleteUangMakan", id);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("FetchUangMakan");
  },
};
</script>
