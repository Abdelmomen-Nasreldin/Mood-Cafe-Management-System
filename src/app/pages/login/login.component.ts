import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private _router: Router) {}
  loading = false;
  async login(username: string, password: string): Promise<void> {
    const success = await this.authService.login(username, password);
    console.log('Login attempt', success, username, password);

    if (success) {
      console.log('Login successful');
      this._router.navigate(['/']);
    } else {
      console.log('Invalid credentials');
    }
  }
}
