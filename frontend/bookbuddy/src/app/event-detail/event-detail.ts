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

  back() {
    this.router.navigate(['/eventList']);
  }
}
