import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.gard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full',title:'login' },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'register',
      },
    ],
  },
  {
    path:'user',loadComponent: () =>
      import('./layouts/user-layout/user-layout.component').then(
        (c) => c.UserLayoutComponent
      )
      ,
      canActivate:[AuthGuard]
  }
];
