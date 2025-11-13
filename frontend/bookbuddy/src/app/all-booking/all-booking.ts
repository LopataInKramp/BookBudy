import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Booking {
  id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  status: 'confirmed' | 'upcoming';
  bookingDate: string;
  confirmationNumber: string;
  image: string;
}

@Component({
  selector: 'app-all-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-booking.html',
  styleUrls: ['./all-booking.css']
})
export class AllBooking {
  activeTab: 'upcoming' | 'past' = 'upcoming';

  upcomingBookings: Booking[] = [
    {
      id: '1',
      eventTitle: 'Global Tech Summit 2024',
      eventDate: 'October 15, 2024',
      eventTime: '9:00 AM - 5:00 PM',
      eventLocation: 'Convention Center, San Francisco',
      ticketType: 'VIP Pass',
      quantity: 1,
      totalAmount: 299.00,
      status: 'confirmed',
      bookingDate: 'October 1, 2024',
      confirmationNumber: 'EVTPRO-20241001-001',
      image: 'https://images.unsplash.com/photo-1540575467063-178f50002991?w=500&h=300&fit=crop'
    },
    {
      id: '2',
      eventTitle: 'Summer Music Fest',
      eventDate: 'November 01, 2024',
      eventTime: '6:00 PM - 11:00 PM',
      eventLocation: 'Central Park Amphitheater, New York',
      ticketType: 'Standard Pass',
      quantity: 2,
      totalAmount: 298.00,
      status: 'upcoming',
      bookingDate: 'October 15, 2024',
      confirmationNumber: 'EVTPRO-20241015-002',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=300&fit=crop'
    },
    {
      id: '3',
      eventTitle: 'Modern Art Exhibition',
      eventDate: 'December 05, 2024',
      eventTime: '10:00 AM - 7:00 PM',
      eventLocation: 'Grand Gallery, London',
      ticketType: 'Adult Pass',
      quantity: 1,
      totalAmount: 149.00,
      status: 'confirmed',
      bookingDate: 'October 20, 2024',
      confirmationNumber: 'EVTPRO-20241020-003',
      image: 'https://images.unsplash.com/photo-1578926314433-32a750c16e49?w=500&h=300&fit=crop'
    },
    {
      id: '4',
      eventTitle: 'Advanced React Webinar',
      eventDate: 'December 10, 2024',
      eventTime: '2:00 PM - 4:00 PM',
      eventLocation: 'Online (Zoom)',
      ticketType: 'Standard Pass',
      quantity: 1,
      totalAmount: 79.00,
      status: 'confirmed',
      bookingDate: 'November 1, 2024',
      confirmationNumber: 'EVTPRO-20241101-005',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop'
    }
  ];

  pastBookings: Booking[] = [
    {
      id: '5',
      eventTitle: 'Cloud Solutions Conference',
      eventDate: 'September 10, 2024',
      eventTime: '8:00 AM - 6:00 PM',
      eventLocation: 'Tech Center, Seattle',
      ticketType: 'Standard Pass',
      quantity: 3,
      totalAmount: 447.00,
      status: 'confirmed',
      bookingDate: 'August 25, 2024',
      confirmationNumber: 'EVTPRO-20240825-004',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
    }
  ];

  constructor(private router: Router) {}

  getDisplayBookings(): Booking[] {
    return this.activeTab === 'upcoming' ? this.upcomingBookings : this.pastBookings;
  }

  setActiveTab(tab: 'upcoming' | 'past') {
    this.activeTab = tab;
  }

  viewDetails(booking: Booking) {
    alert(`Viewing details for ${booking.confirmationNumber}`);
  }

  browseMoreEvents() {
    this.router.navigate(['/eventList']);
  }

  back() {
    this.router.navigate(['/eventList']);
  }
}
