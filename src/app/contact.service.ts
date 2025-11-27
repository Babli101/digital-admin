import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteContact(id: string | number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateContact(id: string | number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  
}
