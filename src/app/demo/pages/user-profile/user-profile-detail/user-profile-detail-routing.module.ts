import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileDetailComponent } from './user-profile-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':pin/profile',
        component : UserProfileDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileDetailRoutingModule { }