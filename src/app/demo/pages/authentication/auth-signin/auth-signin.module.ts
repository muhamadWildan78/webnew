import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';

@NgModule({
  imports: [
    CommonModule,
    AuthSigninRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AuthSigninComponent],
  providers: []
})
export class AuthSigninModule { }
