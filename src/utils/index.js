import { reactive } from "vue";

export const errorMessage = reactive({
  error: false,
  message: "",
  color: "red",
});

export const commonErrorHandler = (error) => {
  console.log(error);
};

export function getPropertyStatusClass(status) {
  switch (status) {
    case "Open":
      return "green";
    case "Booked":
      return "warning";
    case "Pending":
      return "info";
    case "Sold":
      return "red";
    case "Canceled":
      return "error";
  }
}
