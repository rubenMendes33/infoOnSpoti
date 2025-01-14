import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let angularFireAuthMock: Partial<AngularFireAuth>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    angularFireAuthMock = {
      get authState() {
        return of(null); // Default to unauthenticated state
      },
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: angularFireAuthMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation when user is authenticated', (done) => {
    // Mock authenticated state
    jest.spyOn(angularFireAuthMock, 'authState', 'get').mockReturnValue(of({ uid: '12345' } as any));

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true); // Authenticated user can activate the route
      expect(routerMock.navigate).not.toHaveBeenCalled(); // No navigation to /login
      done();
    });
  });

  it('should deny activation when user is not authenticated', (done) => {
    // Mock unauthenticated state
    jest.spyOn(angularFireAuthMock, 'authState', 'get').mockReturnValue(of(null));

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false); // Unauthenticated user cannot activate the route
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']); // Redirect to /login
      done();
    });
  });
});
