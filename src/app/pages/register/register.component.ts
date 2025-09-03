import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { IRegistration } from '../../core/interfaces/http';
import { MessageService } from 'primeng/api';
import {NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
  SharedModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router
  ) {}
  registrationForm: FormGroup = this._formBuilder.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],

    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    rePassword: [
      '',
      [Validators.required, this.passwordMatchValidator('password')],
    ],
  });
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }
  get rePassword() {
    return this.registrationForm.get('rePassword');
  }
  passwordMatchValidator(passwordControlName: string): ValidatorFn {
    return (rePass: AbstractControl): null | ValidationErrors => {
      if (!rePass.parent) return null;
      const password = rePass.parent.get(passwordControlName)?.value;
      const confirm = rePass.value;
      return password === confirm && confirm !== ''
        ? null
        : { passwordMismatch: true };
    };
  }
  submit() {
    if (this.registrationForm.valid) {
      this.signUp({
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        username: this.username?.value,
        password: this.password?.value,
      });
    } else {
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((control) =>
        this.registrationForm.controls[control].markAsDirty()
      );
    }
  }
  signUp(UserData: IRegistration): void {
    this._ngxSpinnerService.show();
    this._authService.register(UserData).subscribe({
      next: (response) => {
        if (response.id) {
          this.show('success', 'Success', 'Sucess Register');
          this._authService
            .login({ username: 'emilys', password: 'emilyspass' })
            .subscribe((next) => {
              this._router.navigate(['home']);
            });
        }
        this._ngxSpinnerService.hide();
      },
      error: (err) => {
        this.show('error', 'Error', err.error.error);
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
