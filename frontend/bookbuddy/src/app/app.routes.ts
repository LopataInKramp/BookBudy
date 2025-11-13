import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { EventList } from './event-list/event-list';
import { EventDetail } from './event-detail/event-detail';
import { EventBooking } from './event-booking/event-booking';
import { TestBooking } from './test-booking/test-booking';
import { ConfirmationBooking } from './confirmation-booking/confirmation-booking';
import { AllBooking } from './all-booking/all-booking';

export const routes: Routes = [
    { path: 'register', component: Login },
    { path: 'login', component: Register },
    { path: 'eventList', component: EventList },
    { path: 'test-booking', component: TestBooking },
    { path: 'confirmation-booking', component: ConfirmationBooking },
    { path: 'all-bookings', component: AllBooking },
    { path: 'events/:id/booking', component: EventBooking },
    { path: 'events/:id', component: EventDetail }
];
