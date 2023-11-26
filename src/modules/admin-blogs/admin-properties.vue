<script setup>
import { computed, reactive, onMounted } from "vue";
import { useProperties } from "./store";
import { headers } from "./util";
import { getPropertyStatusClass } from "@/utils/index";
// ==========Fetch Api Data==============
const propertiesStore = useProperties();
const properties = computed(() => propertiesStore.properties);
// ========================================

//=========== filters==================
const filter = reactive({
  perPage: 10,
  page: 1,
  sortBy: [],
  project_slug: null,
  search: null,
});
// ======================================

//================Pagination=====================
let timeoutId = null;
function loadItems({ page, itemsPerPage }) {
  clearTimeout(timeoutId);
  filter.perPage = itemsPerPage;
  filter.page = page;
  timeoutId = setTimeout(() => propertiesStore.fetchProperties(filter), 2000);
}
// =======================================

// =========filter with project name and kitta=================
onMounted(() => {
  propertiesStore.fetchProject();
});
const filterProjects = computed(() =>
  propertiesStore.project.map((currProject) => {
    return { value: currProject.slug, title: currProject.title };
  })
);

function resetFilters() {
  filter.project_slug = null;
  filter.search = null;
  loadItems({ page: 1 });
}
// ======================================
</script>
<template>
  <!-- =========filters=============== -->
  <v-container>
    <v-form>
      <v-row>
        <!-- filter by project name using select input field -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            label="Select Project"
            :items="filterProjects"
            v-model="filter.project_slug"
            @update:model-value="loadItems"
          ></v-select>
        </v-col>
        <!-- ----------------------------------------------- -->
        <!-- filter by title using text input field -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Property Title"
            v-model="filter.search"
            @keyup="loadItems"
          ></v-text-field>
        </v-col>
        <!-- -------------------------------------- -->
        <!-- reset filter -->
        <v-col cols="12" sm="6" md="4">
          <v-btn
            @click.stop="resetFilters"
            class="bg-red text-white text-capitalize elevation-0 pt-0"
            size="x-large"
            >Reset</v-btn
          >
        </v-col>
        <!-- ----------------------- -->
      </v-row>
    </v-form>
  </v-container>
  <!-- =============================== -->
  <v-data-table-server
    v-if="properties"
    :items-per-page="filter.itemsPerPage"
    :loading="propertiesStore.isLoading"
    :headers="headers"
    :items="properties"
    :items-length="propertiesStore.totalProperties"
    v-model:sort-by="filter.sortBy"
    :items-per-page-options="[
      { title: '10', value: 10 },
      { title: '20', value: 20 },
      { title: 'All', value: propertiesStore.totalProperties },
    ]"
    @update:options="loadItems"
    :height="properties.length > 12 ? '70vh' : '100%'"
    fixed-header
    class="elevation-1"
    hover="true"
  >
    <!-- display status with color --------->
    <template v-slot:[`item.status_name`]="{ item }">
      <v-alert :color="getPropertyStatusClass(item.status_name)" height="15">{{
        item.status_name
      }}</v-alert>
    </template>
    <!-- End of display status with color -->
    <!-- View,Edit and Delete Button -->
    <template v-slot:item.actions="{ item }">
      <div class="d-flex align-center">
        <!-- view -->
        <v-btn
          icon="mdi:mdi-eye-outline"
          variant="plain"
          elevation="0"
          color="green"
        ></v-btn>
        <!-- edit item with modal -->
        <div class="text-center">
          <v-btn
            elevation="0"
            color="orange"
            variant="plain"
            icon="mdi:mdi-pencil"
          >
          </v-btn>
        </div>
        <!-- end of edit item modal -->
        <!-- delete -->
        <v-btn
          icon="mdi:mdi-delete"
          elevation="0"
          color="red"
          variant="plain"
        ></v-btn>
      </div>
    </template>
    <!-- End of View,Edit and Delete Button -->
  </v-data-table-server>
  <div v-else>No data to display</div>
  <div v-if="propertiesStore.isLoading" class="d-flex justify-center">
    <v-img
      src="../../assets/images/loading.gif"
      height="100"
      width="100"
    ></v-img>
  </div>
</template>
<style>
@media (max-width: 1400px) {
  .v-data-table__td {
    min-width: 150px;
  }
}
</style>
