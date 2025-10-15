import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contacto';
import { Auth } from './auth-service';
import { EventDispatcher } from '@angular/core/primitives/event-dispatch';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  authService = inject(Auth);

  readonly URL_BASE = "https://agenda-api.somee.com/api/contacts";

  contacts: Contact[] = [];
  favoriteContacts: Contact[] = [];

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
  async deleteContact(id: number) {
    const res = await fetch(this.URL_BASE + "/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) return;
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    return true;
  }

  async editContact(contact: Contact) {
    const res = await fetch(this.URL_BASE + "/" + contact.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(contact),
      });
    if (!res.ok) {
      return
    }

    this.contacts = this.contacts.map(oldContact => {
      if (oldContact.id === contact.id) return contact;
      return oldContact;
    })
    return contact;

  }

  /** Obtiene los contactos del backend */
  async getContacts() {
    const res = await fetch(this.URL_BASE,
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

  async getFavoriteContacts() {
    await this.getContacts();
    const res = this.contacts.filter((contact) => contact.isFavorite == true);
    if (res) {
      this.favoriteContacts = res;
    }
  }

  async getContactById(id: string | number) {
    const res = await fetch(this.URL_BASE + "/" + id,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.authService.token
        }
      }
    )
    if (res.ok) {
      const resJson: Contact = await res.json();
      return resJson;
    }
    return null;
  }

  async toggleFavourite(contactId: number) {
    const res = await fetch(this.URL_BASE + "/" + contactId + "/favorite",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    if (!res.ok) return;
    /** Edita la lista actual de contactos reemplazando sólamente el favorito del que editamos */
    this.contacts = this.contacts.map(contact => {
      if (contact.id === contactId) {
        return { ...contact, isFavorite: !contact.isFavorite };
      };
      return contact;
    });
    this.getFavoriteContacts();
    return true;
  }

  sortContacts(contacts: Contact[]) {
    console.log(contacts.sort)

  }

}

