import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileDetailComponent } from './user-profile-detail.component';
import { UserProfileDetailRoutingModule } from './user-profile-detail-routing.module';



@NgModule({
  declarations: [UserProfileDetailComponent],
  imports: [
    CommonModule,
    UserProfileDetailRoutingModule
  ]
})
export class UserProfileDetailModule { }
