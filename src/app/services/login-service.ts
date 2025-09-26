import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Login} from '../models/auth/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  login(credentials: Login){
    return this.http.post('http://localhost:8080/auth/login', credentials)
  }

}
