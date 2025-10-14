import Swal from "sweetalert2";

export const showConfirmModal = Swal.mixin({
    showDenyButton: false,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonColor: "red",
    cancelButtonText: "Cancelar",
    background: "var(--color-primary)",
    color: "var(--color-text)",
});
