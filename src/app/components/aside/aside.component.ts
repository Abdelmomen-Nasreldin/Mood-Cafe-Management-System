import { Component } from '@angular/core';
import { PAGES } from '../../defines/defines';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent {
  constructor(private _authService: AuthService) {}

  pages = [
    {
      name: 'المنيو',
      path: PAGES.MENU,
    },
    {
      name: 'طلبات اليوم',
      path: PAGES.ORDERS,
    },
    {
      name: 'المدفوعات',
      path: PAGES.PAID,
    },
    {
      name: 'temp',
      path: PAGES.POSTPONED,
    },
    {
      name: 'الملغية',
      path: PAGES.CANCELLED,
    },
    {
      name: 'tracking',
      path: PAGES.TRACKING,
    },
  ];

  logout() {
    this._authService.logout();
  }
}
