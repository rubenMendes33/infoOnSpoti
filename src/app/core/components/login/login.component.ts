import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastService} from '../../../shared/services/toast.service';
import {AuthService} from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {Router, RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


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
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);


  protected loginForm = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl('' )
    }
  )

  protected onSubmit() {
    this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).
    pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.router.navigateByUrl('/').then(() => {
          this.toastService.showSuccess('Success', 'Logged in');
        });
    }, error: (err) => {
      this.toastService.showError('Error', err.code);
    }});
  }

}
