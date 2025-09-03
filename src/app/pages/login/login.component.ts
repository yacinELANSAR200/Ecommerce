import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { ILogin } from '../../core/interfaces/http';
import { MessageService } from 'primeng/api';
import {  NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation:ViewEncapsulation.None


})
export class LoginComponent {
constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router
  ) {}
  loginForm: FormGroup = this._formBuilder.group({

   username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],

  });

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }


  submit() {

    if (this.loginForm.valid) {
      this.SignIn({ username: 'emilys', password: 'emilyspass'});
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }
  SignIn(UserData: ILogin): void {
    this._ngxSpinnerService.show();
    this._authService.login(UserData).subscribe({
      next: (response) => {
        if (response.id) {
          this.show('success', 'Success', 'Sucess login');
          localStorage.setItem("token",response.accessToken)
        }
        this._ngxSpinnerService.hide();
        this._router.navigate(['home']);
      },
      error: (err) => {
        console.log("err",err)
        this.show('error', 'Error', err.message);
        this._ngxSpinnerService.hide();
      },
    });
  }
  show(severity: string, summary: string, detail: string) {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
