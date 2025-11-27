import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactList implements OnInit {

  contacts: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef // ✅ Force view update
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.loading = true;
    this.errorMessage = '';

    this.contactService.getContacts().subscribe({
      next: (res: any[]) => {
        this.contacts = res || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching contacts', err);
        this.errorMessage = 'Failed to load contacts.';
        this.loading = false;
      }
    });
  }

  deleteContact(id: string | number) {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    this.contactService.deleteContact(id).subscribe({
      next: () => {
        // 🔹 Use _id from Mongoose
        this.contacts = this.contacts.filter(c => c._id !== id);
        this.cdr.detectChanges(); // 🔹 Force Angular to update the table instantly
      },
      error: (err) => {
        console.error('Error deleting contact', err);
        alert('Failed to delete contact.');
      }
    });
  }

  editContact(contact: any) {
    const newName = prompt('Enter new name:', contact.name);
    if (!newName) return;

    const updatedContact = { ...contact, name: newName };

    this.contactService.updateContact(contact._id, updatedContact).subscribe({
      next: () => {
        const index = this.contacts.findIndex(c => c._id === contact._id);
        if (index > -1) this.contacts[index] = updatedContact;
        this.cdr.detectChanges(); // 🔹 Update the view instantly
      },
      error: (err) => {
        console.error('Error updating contact', err);
        alert('Failed to update contact.');
      }
    });
  }
}
