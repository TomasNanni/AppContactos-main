import { Component, inject, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import Swal from 'sweetalert2';
import { ContactListItem } from "../../components/contact-list-item/contact-list-item";

@Component({
  selector: 'app-favorite-contact-list-page',
  imports: [RouterModule, ContactListItem],
  templateUrl: './favorite-contact-list-page.html',
  styleUrl: './favorite-contact-list-page.scss'
})
export class FavoriteContactListPage implements OnInit {
  index = input.required<number>();
  contacto = input.required<Contact>();
  contactsService = inject(ContactsService)

  ngOnInit(): void {
    this.contactsService.getFavoriteContacts();
  }

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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.contactsService.deleteContact(this.contacto().id)
      }
    });
  }
}
