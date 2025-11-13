import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  tag: string;
  image: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string;
}

// Model za odziv iz tvoje C# metode
export interface RegisterResponse {
  success: boolean;
  error?: string | null;
  user?: {
    id: number;
    email: string;
    displayName: string;
  } | null;
}

@Injectable({ providedIn: 'root' })
export class EventService {
  // Base URL for events API - change to your real API endpoint
  private baseUrl = 'https://localhost:7199';

  constructor(private http: HttpClient) { }


  register(req: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/api/auth/register`, req).pipe(
      
    );
  }

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
