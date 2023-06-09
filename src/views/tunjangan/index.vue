<template>
  <layout-app>
    <HeaderTitle title="Dashboard" subtitle="Data Tunjangan" />
    <v-btn
      class="btn text-white fw-normal bg-darkblue mb-3 mr-3"
      v-if="isAdmin"
      @click="handleModalForm(true)"
    >
      <i class="fa fa-plus"></i>
      Add Tunjangan
    </v-btn>
    <v-btn
      class="btn text-white fw-normal bg-darkblue mb-3 mr-3"
      v-if="isAdmin"
      @click="handleModalFormImport(true)"
    >
      <i class="fa fa-file-excel mr-1"></i>
      Import Excel
    </v-btn>
    <v-btn
      class="btn text-white fw-normal bg-darkblue mb-3"
      v-if="isAdmin"
      @click="handleModalFormImportPotongan(true)"
    >
      <i class="fa fa-file-excel mr-1"></i>
      Import Potongan
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
            <template v-slot:[`item.besaran_tunjangan`]="{ item }">
              {{ format3Digit(item.besaran_tunjangan) }}
            </template>
            <template v-slot:[`item.jumlah_potongan`]="{ item }">
              {{ format3Digit(item.jumlah_potongan) }}
            </template>
            <template v-slot:[`item.tunj_dibayar`]="{ item }">
              {{ format3Digit(item.tunj_dibayar) }}
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

    <v-dialog v-if="modalForm" v-model="modalForm" max-width="1200" persistent>
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
      v-if="modalFormImportPotongan"
      v-model="modalFormImportPotongan"
      max-width="600"
      persistent
    >
      <FormImportPotongan
        @handleModalFormImportPotongan="handleModalFormImportPotongan"
      />
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
  name: "TunjanganPage",
  components: {
    LayoutApp,
    HeaderTitle: () => import("@/components/molecules/header-title.vue"),
    Form: () => import("./form.vue"),
    FormImport: () => import("./form-import.vue"),
    FormImportPotongan: () => import("./form-import-potongan.vue"),
    Detail: () => import("./detail.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "NIP", value: "user.nip" },
        { text: "Tanggal", value: "tanggal" },
        { text: "Grade", value: "grade" },
        { text: "Tunjangan", value: "besaran_tunjangan" },
        { text: "Tunjangan Dibayar", value: "tunj_dibayar" },
        { text: "Potongan Kantor", value: "jumlah_potongan" },
        { text: "Action", value: "action", sortable: false, align: "right" },
      ],
      format3Digit,
      moment,
      modalForm: false,
      modalFormImport: false,
      modalFormImportPotongan: false,
      modalDetail: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.tunjangan.isLoading;
    },
    reports() {
      return this.$store.state.tunjangan.reports;
    },
    isAdmin() {
      return this.$store.state.app.user.is_admin;
    },
    optionsTable: {
      get() {
        return this.$store.state.tunjangan.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_TUNJANGAN", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if (value) this.$store.dispatch("FetchBeforeFormTunjangan");
      this.modalForm = value;
    },
    handleModalFormImport(value) {
      this.modalFormImport = value;
    },
    handleModalFormImportPotongan(value) {
      this.modalFormImportPotongan = value;
    },
    handleEdit(id) {
      this.$store.dispatch("SetFormUpdateTunjangan", id);
      this.$store.commit("SET_IS_UPDATE_TUNJANGAN", id);

      this.handleModalForm(true);
    },
    handleModalDetail(value, id) {
      if (value) this.$store.dispatch("FetchTunjanganDetail", id);
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
          this.$store.dispatch("DeleteTunjangan", id);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("FetchTunjangan");
  },
};
</script>
