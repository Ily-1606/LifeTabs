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

export { Toast, options, useToast };
