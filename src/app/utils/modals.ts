import Swal from "sweetalert2";

export const errorToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
});

export const confirmModal = Swal.mixin({

})
