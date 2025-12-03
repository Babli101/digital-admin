import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-signup.html'
})
export class AdminSignup {
  name = '';
  email = '';
  password = '';
  error = '';
  imagePreview: any = null;
  selectedImage: File | null = null;
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {}

  // Handle file selection
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // Signup with FormData
  signup() {
    this.submitted = true;

    if (!this.selectedImage) {
      this.error = "Profile image is required";
      return;
    }

    const formData = new FormData();
    formData.append("name", this.name);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("image", this.selectedImage!);

    this.auth.signup(formData).subscribe({
      next: res => {
        console.log('Signup success', res);
        this.router.navigate(['/admin-login']);
      },
      error: err => {
        console.log('Signup error', err);
        this.error = err.error?.message || 'Signup failed';
      }
    });
  }
}
