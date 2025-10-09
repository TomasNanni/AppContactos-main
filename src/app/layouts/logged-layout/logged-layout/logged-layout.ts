import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
  authService = inject(Auth)

  showConfirmModal() {
    Swal.fire({
      title: "¿Quiere cerrar sesión?",
      showDenyButton: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "red",
      cancelButtonText: "Cancelar",
      confirmButtonText: `Cerrar sesión`,
      background: "var(--color-primary)",
      color: "var(--color-text)",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
