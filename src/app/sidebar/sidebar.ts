import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  @Input() collapsed = false;

  constructor(private router: Router) { }

  isMobile = false;

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
  }

  checkScreen() {
    this.isMobile = window.innerWidth < 768;  // mobile breakpoint
  }

  onToggle() {
    this.collapsed = !this.collapsed;
  }


  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin-login']);
  }
}
