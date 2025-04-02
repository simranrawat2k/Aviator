import { toast } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

export const showToast = (message: string, type: ToastType = "success") => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else if (type === "info") {
    toast.info(message);
  } else if (type === "warning") {
    toast.warning(message);
  }
};
