import axios from "axios";
// =========Api=========================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});
// =====================================

// =======fetch properties(GET Method)=========
export const fetchPropertiesApi = async (propertyFilter = {}) => {
  try {
    const response = await api.get("property", { params: propertyFilter });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// =====================================
