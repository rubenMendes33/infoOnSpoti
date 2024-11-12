import {Component, inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastService} from '../../../shared/services/toast.service';
import {AuthService} from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {Router, RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    Button,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  authService = inject(AuthService);
  toastService = inject(ToastService);
  router = inject(Router);

  private readonly destroy$ = new Subject();

  loginForm = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl('' )
    }
  )

  onSubmit() {
    this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).
    pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.router.navigateByUrl('/').then(() => {
          this.toastService.showSuccess('Success', 'Logged in');
        });
    }, error: (err) => {
      this.toastService.showError('Error', err.message);
    }});
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
