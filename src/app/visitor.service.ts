import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VisitorService {

  // Local server
  private baseUrl = 'http://localhost:5000/api/visitor';

  constructor(private http: HttpClient) {}

  // 🔹 COUNTERS → Today, Week, Month
  getVisitorStats() {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  // 🔹 WEEK CHART → /chart/week
  getWeeklyVisitors() {
    return this.http.get(`${this.baseUrl}/chart/week`);
  }

  // 🔹 MONTH CHART → /chart/month
  getMonthlyVisitors() {
    return this.http.get(`${this.baseUrl}/chart/month`);
  }

  // 🔹 Add a Visitor
  logVisitor(ip: string) {
    return this.http.post(`${this.baseUrl}`, { ip });
  }
}
