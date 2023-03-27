/**
 * vue-toastification
 * https://github.com/Maronato/vue-toastification/tree/next
 */

import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  newestOnTop: true,
};

/**
 * handleException from http client
 * @param {AxiosError}
 * @readonly
 */
const handleHTTPException = (axiosError) => {
  const toast = useToast();
  if (!axiosError?.response?.data.success) {
    toast.error(axiosError.response.data.errors);
    return;
  }
  toast.error("Có lỗi khi thực hiện hành động này");
};

export { Toast, options, useToast, handleHTTPException };
