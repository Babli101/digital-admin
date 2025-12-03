import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
  return this.http.post(`${this.API_URL}/signup`, data);
}

login(data: any): Observable<any> {
  return this.http.post(`${this.API_URL}/login`, data);
}

// Save user info to localStorage
saveUser(admin: any) {
  // ⚠️ Make sure image is included
  localStorage.setItem('user', JSON.stringify(admin));
}

getUser() {
  try {
    const stored = localStorage.getItem('user');
    if (!stored || stored === 'undefined' || stored === 'null') return null;
    return JSON.parse(stored);
  } catch (e) {
    console.error('Invalid JSON in localStorage:', e);
    return null;
  }
}
  logout() {
    localStorage.removeItem('user');
  }
}
