import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { ContactsService } from '../../services/contacts-service';

@Component({
  selector: 'app-contact-list-page',
  imports: [RouterModule, ContactListItem],
  templateUrl: './contact-list-page.html',
  styleUrl: './contact-list-page.scss'
})
export class ContactListPage implements OnInit {
  ngOnInit(): void {
    this.contactsService.getContacts();
  }

  contactsService = inject(ContactsService)
}