import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, map, catchError, of } from 'rxjs';
import { supabase } from '../supabase/supabase.client';

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
  private events = {};
  private baseUrl = 'https://localhost:7199';

  constructor(private http: HttpClient) { }


  register(req: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/api/auth/register`, req).pipe(

    );
  }

  getLocation(): void {
      console.log(this.events);
  }

  getEvents(): Observable<EventItem[]> {
    return from(supabase.from('events').select('*')).pipe(
      map((res: any) => {
        if (res.error) {
          throw res.error;
        }
        else {
          res.data.forEach((event: EventItem) => {
            event.image = 'https://picsum.photos/seed/rocknight/800/500';
          });
          this.events = res.data;
        }
        return (res.data || []) as EventItem[];
      }),
      catchError((err) => {
        console.error('Failed to load events from Supabase', err);
        return of([] as EventItem[]);
      })
    );
  }

  getEventById(id: string): Observable<EventItem | null> {
    return from(supabase.from('events').select('*').eq('id', id).maybeSingle()).pipe(
      map((res: any) => {
        if (res.error) {
          throw res.error;
        }
        return (res.data || null) as EventItem | null;
      }),
      catchError((err) => {
        console.error(`Failed to load event ${id} from Supabase`, err);
        return of(null);
      })
    );
  }
}
