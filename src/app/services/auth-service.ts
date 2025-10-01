import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/auth/login';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);
  private router = inject(Router);

  login(credentials: Login){
    return this.http.post('http://localhost:8080/auth/login', credentials)
  }


  isAuthenticated = signal<boolean>(this.hasToken());

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.isAuthenticated.set(true);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigateByUrl('/login');
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

}
