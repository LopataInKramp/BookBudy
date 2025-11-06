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

  events: EventItem[] = [];
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
