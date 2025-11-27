import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriberService {
  private baseUrl = 'http://localhost:5000/api/subscribers';

  constructor(private http: HttpClient) { }

  getAllSubscribers() {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getSubscriberChartData() {
    return this.http.get<any>(`${this.baseUrl}/chart-data`);
  }

getWeeklySubscribers() {
  return this.http.get<any>(`${this.baseUrl}/weekly`);
}

}

