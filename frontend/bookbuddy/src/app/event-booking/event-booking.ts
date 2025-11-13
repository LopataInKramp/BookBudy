import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EventService, EventItem } from '../services/event.service';

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  available: number;
  isLimited: boolean;
}

@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './event-booking.html',
  styleUrls: ['./event-booking.css']
})
export class EventBooking implements OnInit {
  event: EventItem | null = null;
  loading = false;
  error: string | null = null;

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

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Event id missing';
      return;
    }
    this.loadEvent(id);
  }

  private loadEvent(id: string) {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (list) => {
        this.event = list.find(e => e.id === id) ?? null;
        if (!this.event) this.error = 'Event not found';
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load event';
        this.loading = false;
      }
    });
  }

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

    // TODO: Send booking to backend
    console.log('Booking tickets:', selectedTickets);
    alert('Booking confirmed! Check your email for confirmation.');
  }

  back() {
    this.router.navigate(['/events', this.event?.id]);
  }
}
