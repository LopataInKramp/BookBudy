import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EventService, EventItem } from '../services/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.css']
})
export class EventDetail implements OnInit {
  event: EventItem | null = null;
  loading = false;
  error: string | null = null;

  // Static test events data as fallback
  private allEvents: EventItem[] = [
    {
      id: '1',
      title: 'FutureTech Summit 2024',
      date: 'October 26, 2024',
      location: 'Innovation Hub, City Center',
      tag: 'Technology',
      image: 'https://images.unsplash.com/photo-1540575467063-178f50002991?w=500&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Web Development Bootcamp',
      date: 'November 1, 2024',
      location: 'Tech Plaza, Downtown',
      tag: 'Education',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'AI & Machine Learning Workshop',
      date: 'November 15, 2024',
      location: 'Science Center, Main Street',
      tag: 'AI/ML',
      image: 'https://images.unsplash.com/photo-1677442d019e0eae6bbee7eefe32a01235f0ae0d?w=500&h=300&fit=crop'
    },
    {
      id: '4',
      title: 'Cloud Solutions Conference',
      date: 'November 20, 2024',
      location: 'Convention Center, Harbor District',
      tag: 'Cloud',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
    },
    {
      id: '5',
      title: 'Cybersecurity Seminar',
      date: 'December 5, 2024',
      location: 'Security Institute, Tech Park',
      tag: 'Security',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop'
    },
    {
      id: '6',
      title: 'Mobile App Development Summit',
      date: 'December 10, 2024',
      location: 'Innovation Hub, City Center',
      tag: 'Mobile',
      image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8b08f?w=500&h=300&fit=crop'
    }
  ];

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

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
    // Use static data instead of API call
    this.event = this.allEvents.find(e => e.id === id) ?? null;
    if (!this.event) {
      this.error = 'Event not found';
    }
    this.loading = false;
  }

  back() {
    this.router.navigate(['/eventList']);
  }

  makeBooking() {
    if (this.event) {
      this.router.navigate(['/events', this.event.id, 'booking']);
    }
  }
}
