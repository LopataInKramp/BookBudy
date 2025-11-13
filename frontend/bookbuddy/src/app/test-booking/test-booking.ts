import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  available: number;
  isLimited: boolean;
}

@Component({
  selector: 'app-test-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-booking.html',
  styleUrls: ['./test-booking.css']
})
export class TestBooking {
  tickets: TicketType[] = [
    {
      id: 'vip',
      name: 'VIP Pass',
      price: 299,
      description: 'Access to all sessions, VIP lounge, and exclusive networking event.',
      quantity: 0,
      available: 10,
      isLimited: false
    },
    {
      id: 'standard',
      name: 'Standard Pass',
      price: 149,
      description: 'Access to all main sessions and exhibition hall.',
      quantity: 0,
      available: 50,
      isLimited: false
    },
    {
      id: 'student',
      name: 'Student Pass',
      price: 79,
      description: 'Discounted access for verified students (ID required at entry).',
      quantity: 0,
      available: 25,
      isLimited: false
    },
    {
      id: 'workshop',
      name: 'Pre-Conference Workshop',
      price: 99,
      description: 'Hands-on workshop on AI Ethics, limited seats available.',
      quantity: 0,
      available: 5,
      isLimited: true
    }
  ];

  constructor(private router: Router) {}

  incrementQuantity(ticket: TicketType) {
    if (ticket.quantity < ticket.available) {
      ticket.quantity++;
    }
  }

  decrementQuantity(ticket: TicketType) {
    if (ticket.quantity > 0) {
      ticket.quantity--;
    }
  }

  getTotalPrice(): number {
    return this.tickets.reduce((total, ticket) => total + (ticket.price * ticket.quantity), 0);
  }

  getTotalTickets(): number {
    return this.tickets.reduce((total, ticket) => total + ticket.quantity, 0);
  }

  bookTickets() {
    const selectedTickets = this.tickets.filter(t => t.quantity > 0);
    if (selectedTickets.length === 0) {
      alert('Please select at least one ticket');
      return;
    }

    console.log('Booking tickets:', selectedTickets);
    alert('Booking confirmed! Check your email for confirmation.');
  }

  goBack() {
    this.router.navigate(['/eventList']);
  }
}
