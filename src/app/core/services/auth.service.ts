import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, IRegistration } from '../interfaces/http';
import { baseUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}
  register(UserData: IRegistration): Observable<any> {
    return this._httpClient.post(`${baseUrl}/users/add`, UserData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  login(UserData: ILogin): Observable<any> {
    return this._httpClient.post(`${baseUrl}/auth/login`, UserData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  isAuthorized(): boolean {
    return localStorage.getItem('token') != null;
  }
}
