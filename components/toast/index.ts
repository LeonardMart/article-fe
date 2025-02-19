import Swal from "sweetalert2";

interface Toast {
  msg: string;
  position?: "top" | "top-start" | "top-end" | "center" | "center-start" | "center-end" | "bottom" | "bottom-start" | "bottom-end";
  showCloseButton?: boolean;
  duration?: number;
}

export const toast = ({ msg, position = "bottom-start", showCloseButton = false, duration = 3000 }: Toast) => {
  const toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer: duration,
    showCloseButton,
  });
  toast.fire({
    title: msg,
  });
};
