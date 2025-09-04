import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl, baseUrlProduct } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private _httpClient: HttpClient) {}
  userName: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem('name') || ''
  );
  getCartCount(id:number): Observable<any> {
    return this._httpClient.get(`${baseUrl}/carts/user/${id}`);
  }
   allProducts(): Observable<any> {
    return this._httpClient.get(`${baseUrlProduct}/products`);
  }
}
