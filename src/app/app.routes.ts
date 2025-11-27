import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { ContactList } from './contact-list/contact-list';
import { SubscriberList } from './subscriber-list/subscriber-list';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'contacts', component: ContactList },
    { path: 'subscribers', component: SubscriberList },
];
