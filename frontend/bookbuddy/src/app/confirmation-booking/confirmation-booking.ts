import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-booking.html',
  styleUrls: ['./confirmation-booking.css']
})
export class ConfirmationBooking {
  event = {
    title: 'Annual Tech Summit 2024: Innovate & Growths',
    date: 'August 16, 2024',
    time: '09:00 AM - 05:00 PM',
    location: 'Convention Centre, Downtown, Silicon Valley',
    organizer: 'Organizer: Global Tech Solutions Inc.',
    image: 'https://images.unsplash.com/photo-1540575467063-178f50002991?w=600&h=400&fit=crop'
  };

  booking = {
    confirmationNumber: 'EVTPRO-20240728-123456',
    ticketType: 'Standard Access Pass',
    quantity: 2,
    pricePerTicket: 199.00,
    totalAmount: 398.00
  };

  constructor(private router: Router) {}

  viewMyBookings() {
    alert('Navigating to My Bookings...');
  }

  backToEventList() {
    this.router.navigate(['/eventList']);
  }
}
