import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthVerificateAccountComponent } from './auth-verificate-account.component';

describe('AuthVerificateAccountComponent', () => {
  let component: AuthVerificateAccountComponent;
  let fixture: ComponentFixture<AuthVerificateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthVerificateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthVerificateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
