import { Routes } from '@angular/router';
import {LoginComponent} from './core/components/login/login.component';
import {DashboardComponent} from './features/dashboard/dashboard/dashboard.component';
import {AuthGuard} from './core/guards/auth.guard';
import {RegisterComponent} from './core/components/register/register.component';

export const routes: Routes = [ { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },];
