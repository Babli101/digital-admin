import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'], // ✅ FIXED
})
export class Navbar {
 @Output() toggleSidebar = new EventEmitter<void>();

  onToggle() {
    console.log('Navbar toggle clicked'); // debug
    this.toggleSidebar.emit();
  }
}
