import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthVerificateAccountRoutingModule } from './auth-varificate-account-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AuthVerificateAccountComponent } from './auth-verificate-account.component';

@NgModule({
  declarations: [
    AuthVerificateAccountComponent
  ],
  imports: [
    CommonModule,
    AuthVerificateAccountRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class AuthVerificateAccountModule { }
