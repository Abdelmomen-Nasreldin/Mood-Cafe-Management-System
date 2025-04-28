import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
import { IStaticMethods } from 'preline/preline';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { AsideComponent } from './components/aside/aside.component';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuPageComponent, AsideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'moods-cafe';
  user : User | null = null;

  constructor(
    private readonly router: Router,
    private readonly _authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });

    this._authService.getCurrentUserRole().subscribe((user) => {
      this.user = user;
    });
  }
}
