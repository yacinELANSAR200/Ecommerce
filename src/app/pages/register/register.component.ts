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
   
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private _formBuilder: FormBuilder) {}
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
      return password === confirm && confirm!=='' ? null : { passwordMismatch: true };
    };
  }
  submit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched()
      Object.keys(this.registrationForm.controls).forEach((control)=>
      this.registrationForm.controls[control].markAsDirty()
      )
    } else {
      console.log(this.registrationForm);

    }
  }
}
