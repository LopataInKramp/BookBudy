import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { EventList } from './event-list/event-list';
import { EventDetail } from './event-detail/event-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'eventList', component: EventList },
    { path: 'events/:id', component: EventDetail }
];
