// auth.service.ts
import { Injectable } from '@angular/core';
import { PAGES, Roles, ROLES } from '../defines/defines';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

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

  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private _router: Router) {}

  public getCurrentUserRole(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  public async login(username: string, password: string): Promise<boolean> {
    const user = this.accounts.find(
      (account) =>
        account.username === username && account.password === password
    );
    if (user) {
      console.log('User found:', user);
      this.currentUser.next({ name: user.username, role: user.role })
      return true;
    }
    this.currentUser.next(null);
    return false;
  }

  public logout(): void {
    this.currentUser.next(null);
    this._router.navigate([PAGES.LOGIN]);
  }

  public isLoggedIn(): boolean {
    return this.currentUser.getValue() !== null;
  }
}
