// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiEndpoint = 'http://localhost:3000';
  private readonly accounts = [
    { username: 'admin1', password: 'password1' },
    { username: 'admin2', password: 'password2' },
  ];
  private currentUserRole: string | null = null;


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
  }

  public isLoggedIn(): boolean {
    return this.currentUserRole !== null;
  }
}


