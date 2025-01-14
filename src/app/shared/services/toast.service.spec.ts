import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FakeLoader} from '../../app.component.spec';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
