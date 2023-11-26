<script setup>
import { computed, reactive } from "vue";
import { useProperties } from "./store";
import { headers } from "./util";
// ==========Fetch Api Data==============
const propertiesStore = useProperties();
const properties = computed(() => propertiesStore.properties);
// ========================================

//=========== filters==================
const propertyFilter = reactive({
  perPage: 10,
  page: 1,
  sortBy: [],
});
// ======================================

//================Pagination=====================
function loadItems({ page, itemsPerPage }) {
  propertyFilter.perPage = itemsPerPage;
  propertyFilter.page = page;
  propertiesStore.fetchProperties(propertyFilter);
}
// =======================================
</script>
<template>
  <div v-if="propertiesStore.isLoading">Loading...</div>
  <v-data-table-server
    v-if="propertiesStore"
    :items-per-page="propertyFilter.itemsPerPage"
    :loading="propertiesStore.isLoading"
    :headers="headers"
    :items="properties"
    :items-length="propertiesStore.totalProperties"
    v-model:sort-by="propertyFilter.sortBy"
    :items-per-page-options="[
      { title: '10', value: 10 },
      { title: '20', value: 20 },
      { title: 'All', value: propertiesStore.totalProperties },
    ]"
    @update:options="loadItems"
  >
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
</template>
