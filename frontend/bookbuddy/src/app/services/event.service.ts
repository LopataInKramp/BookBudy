import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  tag: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class EventService {
  // Base URL for events API - change to your real API endpoint
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.baseUrl}/events`).pipe(
      catchError((err) => {
        console.error('Failed to load events', err);
        // Return empty array on error so the UI can handle it gracefully
        return of([] as EventItem[]);
      })
    );
  }
}
