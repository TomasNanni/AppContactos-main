import { Component, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts-service';
import { NewContact } from '../../interfaces/contacto';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  idContact = input<string>

  async handleFormSubmission(form:NgForm){
    this.errorEnBack = false;
    const nuevoContacto: NewContact ={
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavourite,
    }

    console.log(nuevoContacto.isFavorite);

    const res = await this.contactsService.createContact(nuevoContacto);
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/logged/contact-list-page"]);
  }
}
