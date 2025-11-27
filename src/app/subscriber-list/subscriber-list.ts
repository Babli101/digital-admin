import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberService } from '../subscriber.service';

@Component({
  selector: 'app-subscriber-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriber-list.html',
  styleUrls: ['./subscriber-list.css'],
})
export class SubscriberList {
  subscribers: { email: string; createdAt: string }[] = [];
  loading = false;
  error = '';

  constructor(private subscriberService: SubscriberService) {}

  ngOnInit() {
    this.fetchSubscribers();
  }

  fetchSubscribers() {
  this.loading = true;

  this.subscriberService.getAllSubscribers().subscribe({
    next: (res) => {
      console.log("Subscribers fetched:", res);  // <--- IMPORTANT
      this.subscribers = res;
      this.loading = false;
    },
    error: (err) => {
      console.error("Fetch error:", err);  // <--- IMPORTANT
      this.error = 'Could not load subscribers';
      this.loading = false;
    }
  });
}

}
