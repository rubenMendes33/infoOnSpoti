import {fireEvent, render, screen} from '@testing-library/angular';
import {LoginComponent} from './login.component';
import {DeferBlockState, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FakeLoader} from '../../../app.component.spec';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import '@testing-library/jest-dom'
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';
import {of} from 'rxjs';



const mockFirebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "mock-auth-domain",
  projectId: "mock-project-id",
  storageBucket: "mock-storage-bucket",
  messagingSenderId: "mock-messaging-sender-id",
  appId: "mock-app-id",
  measurementId: "mock-measurement-id"
};

describe('LoginComponent', () => {
  let authServiceMock: AuthService;
  let toastService: ToastService;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = {
      login: () => of(null)
    } as unknown as AuthService;

    toastService = {
      showSuccess: jest.fn(),
      showError: jest.fn()
    } as unknown as ToastService;

    router = {
      navigateByUrl: () => new Promise(() => {}),
      routerState: {
        root: {}
      }
    } as unknown as Router;

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers:[
        provideFirebaseApp(() => initializeApp(mockFirebaseConfig)),
        provideAuth(() => getAuth()),
        { provide: AuthService, useFactory: () => authServiceMock },
        { provide: ToastService, useValue: toastService },
        { provide: Router, useValue: router },
      ]
    })
      .compileComponents();
  });

  it('should render login form', async () => {
    const { fixture } = await render(LoginComponent);
    const deferBlockFixture = (await fixture.getDeferBlocks())[0];
    await deferBlockFixture.render(DeferBlockState.Complete);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should call login method on form submit', async () => {
    const { fixture } = await render(LoginComponent);
    const deferBlockFixture = (await fixture.getDeferBlocks())[0];
    await deferBlockFixture.render(DeferBlockState.Complete);

    const spy = jest.spyOn(authServiceMock, 'login');

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });

    const passwordNativeInput = passwordInput.querySelector('input');
    if (!passwordNativeInput) {
      throw new Error('Password input not found');
    }

    // Simulate typing into the password input
    fireEvent.input(passwordNativeInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(spy).toHaveBeenCalledWith('test@example.com', 'password123');

  });

});
