import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { ContactList } from './contact-list/contact-list';
import { SubscriberList } from './subscriber-list/subscriber-list';

import { AdminLogin } from './admin-login/admin-login'; 
import { AuthGuard } from './auth.guard';
import { AdminSignup } from './admin-signup/admin-signup';

export const routes: Routes = [
    // LOGIN PAGE
    { path: 'admin-login', component: AdminLogin},
    { path: 'signup', component: AdminSignup },

    // PROTECTED ADMIN ROUTES
    { path: '', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'contacts', component: ContactList, canActivate: [AuthGuard] },
    { path: 'subscribers', component: SubscriberList, canActivate: [AuthGuard] },
    
    
    // DEFAULT REDIRECT
    { path: '**', redirectTo: 'admin-login' },
];
