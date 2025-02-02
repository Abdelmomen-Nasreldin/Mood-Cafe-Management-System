// auth.service.ts
import { Injectable } from '@angular/core';
import { PAGES, Roles, ROLES } from '../defines/defines';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiEndpoint = 'http://localhost:3000';
  private readonly accounts = [
    { username: 'owner', password: 'moods-admin', role: ROLES.ADMIN },
    { username: 'cashier', password: 'moods2025', role: ROLES.CASHIER },
    {
      username: 'owner read only',
      password: 'moods-read',
      role: ROLES.READ_ONLY,
    },
  ];

  private currentUser: User | null = null;

  constructor(private _router: Router) {}

  public getCurrentUserRole(): User | null {
    return this.currentUser;
  }

  public async login(username: string, password: string): Promise<boolean> {
    const user = this.accounts.find(
      (account) =>
        account.username === username && account.password === password
    );
    if (user) {
      this.currentUser = { name: user.username, role: user.role };
      return true;
    }
    this.currentUser = null;
    return false;
  }

  public logout(): void {
    this.currentUser = null;
    this._router.navigate([PAGES.LOGIN]);
  }

  public isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
