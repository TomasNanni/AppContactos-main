import { Component, inject, input, numberAttribute, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-details-page',
  imports: [],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage implements OnInit {
  idContacto = input.required<string>();
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  router = inject(Router);

  async ngOnInit() {
    if (this.idContacto()) {
      // Si encuentro el contacto en el array del servicio lo uso, mientras tanto cargo el contacto del backend por si hubo cambios en el contacto
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.idContacto());
      if (!this.contacto) this.cargandoContacto = true;
      const res = await this.contactService.getContactById(this.idContacto());
      if (res) this.contacto = res;
      this.cargandoContacto = false;
    }
  }

  async toggleFavorite() {
    if (this.contacto) {
      const res = await this.contactService.toggleFavourite(this.contacto.id);
      if (res) this.contacto.isFavorite = !this.contacto.isFavorite;
    }
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
        this.deleteContact();
      }
    });
  }
  async deleteContact() {
    if (this.contacto) {
      const res = await this.contactService.deleteContact(this.contacto.id);
      if (res) this.router.navigate(['/logged/contact-list-page']);
    }
  }
}
