import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactListPage } from './pages/contact-list-page/contact-list-page';
import { RegisterPage } from './pages/register-page/register-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout/logged-layout';
import { onlyUserGuard } from './guards/only-user-guard-guard';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { onlyPublicGuard } from './guards/only-public-guard-guard';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';

export const routes: Routes = [
    {
        path: "logged",
        component: LoggedLayout,
        canActivateChild: [onlyUserGuard],
        children: [
            {
                path: "contact-list-page",
                component: ContactListPage
            },
            {
                path: "contact/new",
                component: NewEditContact
            },
            {
                path: "contact/:idContact/edit",
                component: NewEditContact
            },
            {
                path: "contact/:idContacto",
                component: ContactDetailsPage
            }
        ]
    },

    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicGuard]
    },

    {
        path: "",
        component: LoginPage,
        canActivate: [onlyPublicGuard]
    }
];
