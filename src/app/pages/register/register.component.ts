import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/services/auth.service';
import { IRegistration } from '../../core/interfaces/iregistration';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    PasswordModule,
    ToastModule,
    NgxSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService],
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
    userName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    rePassword: [
      '',
      [Validators.required, this.passwordMatchValidator('password')],
    ],
  });
  get userName() {
    return this.registrationForm.get('userName');
  }
  get email() {
    return this.registrationForm.get('email');
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
        userName: this.userName?.value,
        email: this.email?.value,
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
          this._router.navigate(['login']);
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
