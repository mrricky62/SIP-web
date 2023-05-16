<template>
  <layout-app>
    <HeaderTitle title="Dashboard" subtitle="Data SPD" />
    <v-btn
      class="btn text-white fw-normal bg-darkblue mb-3"
      @click="handleModalForm(true)"
    >
      <i class="fa fa-plus"></i>
      Ajukan SPD
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
            <!-- <template v-slot:[`item.total`]="{ item }">
              {{ format3Digit(item.total) }}
            </template> -->
            <template v-slot:[`item.status`]="{ item }">
              <v-chip small v-if="item.status == 'PENDING'" color="orange" dark>
                {{ item.status }}
              </v-chip>
              <v-chip
                small
                v-if="item.status == 'DISETUJUI'"
                color="green"
                dark
              >
                {{ item.status }}
              </v-chip>
              <v-chip small v-if="item.status == 'DITOLAK'" color="red" dark>
                {{ item.status }}
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
                  <v-list-item @click="handleModalDetail(true, item.id)">
                    <v-list-item-title class="text-primary fs-12">
                      <i class="fas fa-eye small mr-2"></i>
                      <span>Detail</span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="handleEdit(item.id)">
                    <v-list-item-title class="text-primary fs-12">
                      <i class="fas fa-edit small mr-2"></i>
                      <span>Edit</span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="handleDelete(item.id)">
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
  name: "SPDPage",
  components: {
    LayoutApp,
    HeaderTitle: () => import("@/components/molecules/header-title.vue"),
    Form: () => import("./form.vue"),
    Detail: () => import("./detail.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "NIP", value: "user.nip" },
        { text: "No SPD", value: "no_spd" },
        { text: "No ST", value: "no_st" },
        { text: "Sifat", value: "sifat" },
        { text: "Tujuan", value: "tujuan" },
        { text: "Lama", value: "lama" },
        { text: "Status", value: "status" },
        { text: "Total", value: "total" },
        { text: "Tanggal SPM", value: "tanggal_spm" },
        { text: "Action", value: "action", sortable: false, align: "right" },
      ],
      format3Digit,
      moment,
      modalForm: false,
      modalDetail: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.spd.isLoading;
    },
    reports() {
      return this.$store.state.spd.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.spd.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_SPD", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      this.modalForm = value;
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
    this.$store.dispatch("FetchSPD");
  },
};
</script>
