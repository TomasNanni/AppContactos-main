import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';
import { errorToast } from '../../utils/modals';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  authService = inject(Auth)
  router = inject(Router)

  errorLogin = false;

  async login(form: NgForm) {
    console.log(form.value)
    this.errorLogin = false;
    if (!form.value.email || !form.value.password) {
      this.errorLogin = true;
      return
    }
    const loginResult = await this.authService.login(form.value);
    if (loginResult) this.router.navigate(["/logged/contact-list-page"]);
    this.errorLogin = true;
  }

  showErrorToastMail() {
    Swal.fire({
      title: "Error",
      text: "Debe colocar un correo electrónico"
    });
  }
}