import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../services/auth-service';
import { showConfirmModal } from '../../utils/modals';

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  index = input.required<number>();
  contacto = input.required<Contact>();
  contactsService = inject(ContactsService)
  router = inject(Router);

  showConfirmModal() {
    showConfirmModal.fire({
      title: "¿Quiere borrar este contacto permanentemente?",
      confirmButtonText: `Borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteContact();
      }
    });
  }

  async deleteContact() {
    if (this.contacto) {
      const res = await this.contactsService.deleteContact(this.contacto().id);
      if (res) this.router.navigate(['/logged/contact-list-page']);
    }
  }
}