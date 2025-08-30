import { Component } from '@angular/core';
import { UserNavComponent } from '../../components/user-nav/user-nav.component';
import { UserFooterComponent } from '../../components/user-footer/user-footer.component';
import { AuthFooterComponent } from "../../components/auth-footer/auth-footer.component";
import { AuthNavComponent } from '../../components/auth-nav/auth-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [AuthNavComponent,AuthFooterComponent, RouterOutlet ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
