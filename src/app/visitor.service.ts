import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  private baseUrl = 'http://localhost:5000/api/visit';

  constructor(private http: HttpClient) {}

  getVisitorStats() {
    return this.http.get(`${this.baseUrl}/stats`);
  }
}
