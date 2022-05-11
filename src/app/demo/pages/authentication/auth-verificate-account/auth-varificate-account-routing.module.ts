import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthVerificateAccountComponent } from './auth-verificate-account.component';

const routes: Routes = [
  {
    path: '',
    component: AuthVerificateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthVerificateAccountRoutingModule { }