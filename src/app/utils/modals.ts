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

export const showCompletionModal = Swal.mixin({
    background: "var(--color-primary)",
    color: "var(--color-text)",
    showConfirmButton: true,
    confirmButtonColor: "var(--secondary-color)",
    title: "Contacto borrado correctamente",
    icon: "success"
})
