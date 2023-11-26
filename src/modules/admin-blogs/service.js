import axios from "axios";
// =========Api=========================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});
// =====================================

// =======fetch properties(GET Method)=========
export const fetchPropertiesApi = async (propertyFilter = {}) => {
  try {
    const response = await api.get("/property", { params: propertyFilter });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// =====================================

// ======fetch project name(GET Method)=============
export const fetchProjectName = async () => {
  try {
    const response = await api.get("/project/list?perPage=-1");
    return response.data;
  } catch (error) {
    throw error;
  }
};
// =================================================
