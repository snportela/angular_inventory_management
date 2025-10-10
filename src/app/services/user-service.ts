import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserList} from '../models/user/user-list';
import {User} from '../models/user/user';
import {UserRegister} from '../models/user/user-register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url: string = environment.API_URL;
  http: HttpClient = inject(HttpClient);

  getUserList(page: number, size: number): Observable<UserList> {
    return this.http.get<UserList>(`${this.api_url}/users?page=${page}&size=${size}`);
  }

  getUser(id:string): Observable<User> {
    return this.http.get<User>(`${this.api_url}/users/${id}`);
  }

  createUser(newUser: UserRegister): Observable<User> {
    return this.http.post<User>(this.api_url + '/users', newUser);
  }

  updateUser(id: string, updatedUser: Omit<User, 'userId'>): Observable<User> {
    return this.http.put<User>(`${this.api_url}/users/${id}`, updatedUser);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.api_url}/users/${id}`);
  }

}
