import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/auth/login';
import {Router} from '@angular/router';
import {RedeemPassword} from '../models/auth/redeem-password';
import {ResetPassword} from '../models/auth/reset-password';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth_url: string = environment.AUTH_URL;
  http: HttpClient = inject(HttpClient);
  private router = inject(Router);

  login(credentials: Login){
    return this.http.post(`${this.auth_url}/login`, credentials)
  }

  isAuthenticated = signal<boolean>(this.hasToken());

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.isAuthenticated.set(true);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUserRole() {
      const token = this.getToken();
      if(token) {
        try {
          const decodedToken: { sub: string } = jwtDecode(token);

          const subClaim = decodedToken.sub;
          const parts = subClaim.split(';');
          const rolePart = parts.find(part => part.trim().startsWith('role:'));

          if (rolePart) {
            const roleValue = rolePart.split(':')[1].trim();

            if (roleValue === 'ADMIN' || roleValue === 'USER') {
              return roleValue;
            }
          }

          return null;
        } catch (error) {
          console.error("Failed to decode token:", error);
          return null;
        }
      }
    return null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigateByUrl('/login');
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  redeemPassword(email: RedeemPassword) {
    return this.http.post(`${this.auth_url}/redeem-password`, email)
  }

  resetPassword(credentials: ResetPassword) {
    return this.http.post(`${this.auth_url}/reset-password`, credentials);
  }

}
