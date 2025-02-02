import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private _router: Router) {}
  loading = false;
  error = false;
  errorMsg = 'Invalid credentials'
  async login(username: string, password: string): Promise<void> {
    this.error = false;
    const success = await this.authService.login(username, password);

    if (success) {
      console.log('Login successful');
      this._router.navigate(['/']);
    } else {
      console.log('Invalid credentials');
      this.error = true;
    }
  }
}
