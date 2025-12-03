import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactService {

  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) { }

  // Get ALL users
  getContacts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Delete user
  deleteContact(id: string | number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Update user
  updateContact(id: string | number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // ContactService
getRecentUsers() {
  return this.http.get<any[]>(`${this.apiUrl}/recent`);
}



}
