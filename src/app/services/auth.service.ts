// auth.service.ts
import { Injectable } from '@angular/core';
import { PAGES, ROLES } from '../defines/defines';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiEndpoint = 'http://localhost:3000';
  private readonly accounts = [
    { username: 'owner', password: 'moods-admin', role: ROLES.ADMIN },
    { username: 'cashier', password: 'moods2025', role: ROLES.CASHIER },
    { username: 'owner read only', password: 'moods-read', role: ROLES.READ_ONLY },
  ];

  private currentUserRole: string | null = null;

  constructor(private _router : Router) {}

  public getCurrentUserRole(): string | null {
    return this.currentUserRole;
  }

  public async login(username: string, password: string): Promise<boolean> {
    const user = this.accounts.find(
      (account) => account.username === username && account.password === password
    );
    if (user) {
      this.currentUserRole = user.username;
      return true;
    }
    return false;
  }

  public logout(): void {
    this.currentUserRole = null;
    this._router.navigate([PAGES.LOGIN]);
  }

  public isLoggedIn(): boolean {
    return this.currentUserRole !== null;
  }
}


