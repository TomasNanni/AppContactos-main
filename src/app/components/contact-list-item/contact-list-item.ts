import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../services/auth-service';

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
  showConfirmModal() {
      Swal.fire({
        title: "¿Quiere borrar este contacto permanentemente?",
        showDenyButton: false,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "red",
        cancelButtonText: "Cancelar",
        confirmButtonText: `Borrar`,
        background: "var(--color-primary)",
        color: "var(--color-text)",
      }).then((result) => {
        if (result.isConfirmed) {
         this.contactsService.deleteContact(this.contacto().id)
        }
      });
    }
}