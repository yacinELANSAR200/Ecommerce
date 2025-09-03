import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
 items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                path:'home',
            },
            {
                label: 'Products',
                icon: 'pi pi-sparkles',
                path:'products',
            },
            {
                label: 'Categories',
                icon: 'pi pi-th-large',
                path:'category',
            },


        ];
    }
}
