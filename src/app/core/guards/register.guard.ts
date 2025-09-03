import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../../pages/register/register.component';

export const registerGuard: CanDeactivateFn<RegisterComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.registrationForm.valid) {
    const alert = window.confirm(
      'Your data will be lose z Are you sure you want to leave?'
    );
    return alert;
  }
  return true;
};
