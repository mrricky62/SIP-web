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
            <template v-slot:[`item.gaji_pokok`]="{ item }">
              {{ format3Digit(item.gaji_pokok) }}
            </template>
            <template v-slot:[`item.total_potongan`]="{ item }">
              {{ format3Digit(item.total_potongan) }}
            </template>
            <template v-slot:[`item.pembulatan`]="{ item }">
              {{ format3Digit(item.pembulatan) }}
            </template>
            <template v-slot:[`item.total_tunjangan`]="{ item }">
              {{ format3Digit(item.total_tunjangan) }}
            </template>
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

export default {
  name: "GajiPage",
  components: {
    LayoutApp,
    HeaderTitle: () => import("@/components/molecules/header-title.vue"),
    Form: () => import("./form.vue"),
    Detail: () => import("./detail.vue"),
  },
  data() {
    return {
      headers: [
        { text: "NIP", value: "user.nip" },
        { text: "Tanggal", value: "tanggal" },
        { text: "KdGol", value: "kdgol" },
        { text: "Gaji Pokok", value: "gaji_pokok" },
        { text: "Potongan", value: "total_potongan" },
        { text: "Pembulatan", value: "pembulatan" },
        { text: "Tunjangan", value: "total_tunjangan" },
        { text: "Bersih", value: "bersih" },
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
      return this.$store.state.gaji.isLoading;
    },
    reports() {
      return this.$store.state.gaji.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.gaji.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_GAJI", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if (value) this.$store.dispatch("FetchBeforeFormGaji");
      this.modalForm = value;
    },
    handleEdit(id) {
      this.$store.dispatch("SetFormUser", id);
      this.$store.commit("SET_IS_UPDATE_PEGAWAI", id);

      this.handleModalForm(true);
    },
    handleModalDetail(value, id) {
      if (value) this.$store.dispatch("FetchGajiDetail", id);
      this.modalDetail = value;
    },
  },
  mounted() {
    this.$store.dispatch("FetchGaji");
  },
};
</script>
