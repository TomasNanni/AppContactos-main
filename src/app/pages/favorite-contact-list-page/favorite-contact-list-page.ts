import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactsService } from '../../services/contacts-service';
import { ContactListItem } from "../../components/contact-list-item/contact-list-item";

@Component({
  selector: 'app-favorite-contact-list-page',
  imports: [RouterModule, ContactListItem],
  templateUrl: './favorite-contact-list-page.html',
  styleUrl: './favorite-contact-list-page.scss'
})
export class FavoriteContactListPage implements OnInit {
  ngOnInit(): void {
    this.contactsService.getFavoriteContacts();
  }

  contactsService = inject(ContactsService)
}
