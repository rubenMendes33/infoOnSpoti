import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login',
    loadComponent:()=> import('./core/components/login/login.component')
      .then(m => m.LoginComponent)},
  { path: 'register',
    loadComponent:()=> import('./core/components/register/register.component')
      .then(m => m.RegisterComponent)},
  { path: '',
      loadComponent: () => import('./features/dashboard/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },];
