import { Component, OnInit } from '@angular/core';
import { PAGES } from '../../defines/defines';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent implements OnInit {
  user : User | null = null;

  constructor(private _authService: AuthService) {
  }
  ngOnInit(): void {
    console.log('AsideComponent initialized');

    this._authService.getCurrentUserRole().subscribe((user) => {
      this.user = user;
    });
  }

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
