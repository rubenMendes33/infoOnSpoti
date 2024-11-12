import {Component, inject, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {ToastService} from '../../../shared/services/toast.service';
import {DividerModule} from 'primeng/divider';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    Button,
    RouterLink,
    DividerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements  OnDestroy{
  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastService);

  private readonly destroy$ = new Subject();


  registerForm = new FormGroup(
    {
      email: new FormControl('',[Validators.required,  Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)] )
    }
  )

  onSubmit() {
    this.authService.register(this.registerForm.value.email!, this.registerForm.value.userName!, this.registerForm.value.password!).
    pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.router.navigateByUrl('/').then(() => {
          this.toastService.showSuccess('Success', 'User registered');
        });
      }, error: (err) => {
        this.toastService.showError('Error', err.message);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
