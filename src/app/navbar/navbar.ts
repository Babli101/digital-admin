import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // import AuthService

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  user: any = null; // store logged-in user

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser(); // get user from localStorage
  }

  onToggle() {
    console.log('Navbar toggle clicked');
    this.toggleSidebar.emit();
  }
}
