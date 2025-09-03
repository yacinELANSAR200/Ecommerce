import { Component } from '@angular/core';
import { UserNavComponent } from '../../components/user-nav/user-nav.component';
import { UserFooterComponent } from '../../components/user-footer/user-footer.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "../../pages/home/home.component";

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [UserNavComponent, UserFooterComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
