import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../../services/auth-service';
import Swal from 'sweetalert2';
import { showConfirmModal } from '../../../utils/modals';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
  authService = inject(Auth)

  showConfirmModal() {
    showConfirmModal.fire({
      title: "¿Quiere cerrar sesión?",
      confirmButtonText: `Cerrar sesión`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
