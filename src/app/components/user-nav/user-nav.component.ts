import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UserNavComponent {
  constructor(private _userDataService: UserDataService) {}
  items: MenuItem[] | undefined;
  logout: boolean = false;
  userName: string = '';
  cartCount: number =0;
  ngOnInit() {
    this.getUserName();
    this.getCartCount();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        path: 'home',
      },
      {
        label: 'Products',
        icon: 'pi pi-sparkles',
        path: 'products',
      },
      {
        label: 'Categories',
        icon: 'pi pi-th-large',
        path: 'category',
      },
    ];
  }

  toggleLogoutButton(event: Event) {
    this.logout = !this.logout;
    const element = event.target as HTMLElement;
    if (this.logout) {
      element.classList.add('user-name');
    } else {
      element.classList.remove('user-name');
    }
  }
  getUserName(): void {
    this._userDataService.userName.subscribe((name) => (this.userName = name));
  }
  getCartCount(): void {
    const id: number = Number(localStorage.getItem('userID'));
    this._userDataService
      .getCartCount(33)
      .subscribe((next) => this.cartCount=next.carts.length);
  }
}
