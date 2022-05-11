import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    AuthSignupRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
