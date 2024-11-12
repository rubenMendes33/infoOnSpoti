import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastService} from '../../../shared/services/toast.service';
import {AuthService} from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {Router, RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';


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
export class LoginComponent {
  authService = inject(AuthService);
  toastService = inject(ToastService);
  router = inject(Router);

  loginForm = new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('' ,[Validators.required])
    }
  )

  onSubmit() {
    this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe({
      next: () => {
        this.router.navigateByUrl('/').then(() => {
          this.toastService.showSuccess('Success', 'Logged in');
        });
    }, error: (err) => {
      this.toastService.showError('Error', err.message);
    }});
  }
}
