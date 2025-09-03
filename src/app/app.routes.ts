import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { registerGuard } from './core/guards/register.guard';

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
        canDeactivate:[registerGuard]
      },
    ],
  },
  {
    path:'',loadComponent: () =>
      import('./layouts/user-layout/user-layout.component').then(
        (c) => c.UserLayoutComponent
      )
      ,
      children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',loadComponent: () =>
      import('./pages/home/home.component').then(
        (c) => c.HomeComponent
      )},
        {path:'products',loadComponent: () =>
      import('./pages/products/products.component').then(
        (c) => c.ProductsComponent
      )},
        {path:'cart',loadComponent: () =>
      import('./pages/cart/cart.component').then(
        (c) => c.CartComponent
      )},
        {path:'details',loadComponent: () =>
      import('./pages/details/details.component').then(
        (c) => c.DetailsComponent
      )},
        {path:'category',loadComponent: () =>
      import('./pages/category/category.component').then(
        (c) => c.CategoryComponent
      )},
      ],
      canActivate:[AuthGuard]
  }
];
