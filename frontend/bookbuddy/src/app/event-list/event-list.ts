import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EventService, EventItem } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css']
})
export class EventList implements OnInit {
  search = '';

  events: EventItem[] = [
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
  loading = false;
  error: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.loading = true;
    this.error = null;
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load events';
        console.error(err);
        this.loading = false;
      }
    });
  }

  filteredEvents(): EventItem[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.events;
    return this.events.filter(e => (e.title + ' ' + e.location + ' ' + e.tag).toLowerCase().includes(q));
  }
}
