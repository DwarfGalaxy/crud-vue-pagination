import { defineStore } from "pinia";
import { fetchPropertiesApi } from "./service";
import { fetchProjectName } from "./service";
import { commonErrorHandler } from "@/utils/index";
import { ref } from "vue";

export const useProperties = defineStore("properties", () => {
  // =========Reactive State===============
  const properties = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const totalProperties = ref(0);
  const project = ref([]);
  const status = ref([]);
  // =====================================

  // ==========fetch properties=================
  const fetchProperties = async (propertyFilter) => {
    try {
      isLoading.value = true;
      const apiData = await fetchPropertiesApi(propertyFilter);

      properties.value = apiData.data.map((item, index) => ({
        ...item,
        sno: index + 1,
      }));
      totalProperties.value = apiData.meta.total;
    } catch (error) {
      commonErrorHandler(error);
      error.value = error;
    } finally {
      isLoading.value = false;
    }
  };
  // ====================================================

  // =======fetch project==============================
  const fetchProject = async () => {
    try {
      isLoading.value = true;
      const apiData = await fetchProjectName();
      project.value = apiData;
    } catch (error) {
      commonErrorHandler(error);
      error.value = error;
    } finally {
      isLoading.value = false;
    }
  };
  // ==================================================

  // =======Return the properties and methods you want to expose====
  return {
    fetchProperties,
    fetchProject,
    project,
    status,
    properties,
    error,
    isLoading,
    totalProperties,
  };
  // ==============================================================
});
