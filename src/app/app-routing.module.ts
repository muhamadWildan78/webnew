import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuardService } from './demo/pages/authentication/auth-signin/service/auth-guard/auth-guard.service';
import { UserComponent } from './theme/layout/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  }, 
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'user',
        canActivate : [AuthGuardService],
        loadChildren: () => import('./demo/pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
        data: {allowedRoles: ['user']}
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        canActivate : [AuthGuardService],
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {allowedRoles: ['user']}
      },
      {
        path: 'basic',
        canActivate : [AuthGuardService],
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(m => m.UiBasicModule),
        data: {allowedRoles: ['user']}
      },
      {
        path: 'forms',
        canActivate : [AuthGuardService],
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(m => m.FormElementsModule),
        data: {allowedRoles: ['user']}
      },
      {
        path: 'tables',
        canActivate : [AuthGuardService],
        loadChildren: () => import('./demo/pages/tables/tables.module').then(m => m.TablesModule),
        data: {allowedRoles: ['user']}
      },
      {
        path: 'charts',
        canActivate : [AuthGuardService],
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(m => m.CoreChartModule),
        data: {allowedRoles: ['user']}
      },
      {
        path: 'sample-page',
        canActivate : [AuthGuardService],
        loadChildren: () => import('./demo/extra/sample-page/sample-page.module').then(m => m.SamplePageModule),
        data: {allowedRoles: ['user']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
