import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contacto';
import { Auth } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  authService = inject(Auth);

  readonly URL_BASE = "https://agenda-api.somee.com/api/contacts";

  contacts: Contact[] = [];

  async createContact(nuevoContacto: NewContact) {
    const res = await fetch(this.URL_BASE,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(nuevoContacto)
      });
    if (!res.ok) return;
    const resContact: Contact = await res.json();
    this.contacts.push(resContact);
    return resContact;
  }

  /** Elimina un contacto segun su ID */
  deleteContact(id: number) {
    this.contacts = this.contacts.filter(contacto => contacto.id !== id);
  }

  editContact() { }

  /** Obtiene los contactos del backend */
  async getContacts() {
    const res = await fetch('https://agenda-api.somee.com/api/Contacts',
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.authService.token
        }
      })
    if (res.ok) {
      const resJson: Contact[] = await res.json()
      this.contacts = resJson;
    }
  }

}