import { Component, OnInit } from '@angular/core';
import { ASIDE_PAGES, PAGES, ROLES } from '../../defines/defines';
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
  ROLES = ROLES;
  pages : {name: string, path: string}[] = [];
  constructor(private readonly _authService: AuthService) {
  }
  ngOnInit(): void {
    console.log('AsideComponent initialized');
    this._authService.getCurrentUserRole().subscribe((user) => {
      this.user = user;
      this.initPages();
    });
  }


  initPages(){
    this.pages = ASIDE_PAGES.filter((page) => {
      if (this.user?.role !== ROLES.MANAGER) {
        return page.path !== PAGES.CONTROLLING;
      } else{
        return true;
      }
    });
  }

  logout() {
    this._authService.logout();
  }
}
