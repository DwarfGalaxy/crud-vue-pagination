import { reactive } from "vue";

export const errorMessage = reactive({
  error: false,
  message: "",
  color: "red",
});

export const commonErrorHandler = (error) => {
  console.log(error);
};
