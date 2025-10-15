import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts-service';
import { Contact, NewContact } from '../../interfaces/contacto';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  idContact = input<string>();
  contactoBack:Contact | undefined = undefined;
  form  = viewChild<NgForm>("newContactForm");

  async ngOnInit() {
    if(this.idContact()){
      const contacto:Contact|null = await this.contactsService.getContactById(this.idContact()!);
      if(contacto){
        this.contactoBack = contacto;
        this.form()?.setValue({
          address: contacto.address,
          company: contacto.company,
          email: contacto.email,
          firstName:contacto.firstName,
          image:contacto.image,
          isFavourite:contacto.isFavorite,
          lastName: contacto.lastName,
          number: contacto.number
        })
      }
    }
  }

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

    let res;

    if (this.idContact()) {
      console.log({...nuevoContacto, id:this.contactoBack!.id});
      res = await this.contactsService.editContact({...nuevoContacto, id:this.contactoBack!.id});
    }
    else{
      res = await this.contactsService.createContact(nuevoContacto);
    }

    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/logged/contact-list-page"]);
    return;
  }
}
