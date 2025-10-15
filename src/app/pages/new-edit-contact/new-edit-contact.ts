import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts-service';
import { Contact, NewContact } from '../../interfaces/contacto';
import { Spinner } from "../../components/spinner/spinner";
import { showCompletionModal, showConfirmModal } from '../../utils/modals';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  solicitudABackEnCurso = false;
  idContact = input<string>();
  contactoBack: Contact | undefined = undefined;
  form = viewChild<NgForm>("newContactForm");

  async ngOnInit() {
    if (this.idContact()) {
      const contacto: Contact | null = await this.contactsService.getContactById(this.idContact()!);
      if (contacto) {
        this.contactoBack = contacto;
        this.form()?.setValue({
          address: contacto.address,
          company: contacto.company,
          email: contacto.email,
          firstName: contacto.firstName,
          image: contacto.image,
          isFavourite: contacto.isFavorite,
          lastName: contacto.lastName,
          number: contacto.number
        })
      }
    }
  }

  async handleFormSubmission(form: NgForm) {
    this.solicitudABackEnCurso = true;
    this.errorEnBack = false;
    const nuevoContacto: NewContact = {
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
      const message = await this.showConfirmModalEdit();
      if (message) {
        res = await this.contactsService.editContact({ ...nuevoContacto, id: this.contactoBack!.id });
        this.showCompletionModalEdit();
      }
      else {
        this.solicitudABackEnCurso = false;
        return
      };
    }
    else {
      const message = await this.showConfirmModalCreate();
      if (message) {
        res = await this.contactsService.createContact(nuevoContacto);
        this.showCompletionModalCreate();
      }
      else {
        this.solicitudABackEnCurso = false;
        return
      };
    }

    if (!res) {
      this.solicitudABackEnCurso = false;
      this.errorEnBack = true;
      return
    };
    this.solicitudABackEnCurso = true;
    this.router.navigate(["/logged/contact-list-page"]);
    return;
  }

  showConfirmModalEdit() {
    return showConfirmModal.fire({
      confirmButtonText: "Confirmar",
      title: "Confirma editar el contacto?",
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      };
      return false;
    });
  }
  showCompletionModalEdit() {
    showCompletionModal.fire({
      title: "Contacto editado correctamente",
    });
  }

  showConfirmModalCreate() {
    return showConfirmModal.fire({
      confirmButtonText: "Confirmar",
      title: "Confirma crear el contacto?",
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      };
      return false;
    });
  }
  showCompletionModalCreate() {
    showCompletionModal.fire({
      title: "Contacto creado correctamente",
    });
  }
}
