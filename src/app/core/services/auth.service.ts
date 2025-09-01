import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegistration } from '../interfaces/iregistration';
import { baseUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}
  register(UserData: IRegistration): Observable<any> {
    return this._httpClient.post(`${baseUrl}`, UserData);
  }
}
