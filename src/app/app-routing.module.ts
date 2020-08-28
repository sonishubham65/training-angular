import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'account',
  loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
}, {
  path: 'post',
  loadChildren: () => import('./post/post.module').then(module => module.PostModule),
  canActivate: [GuardService, AuthService],
  data: { roles: ['manager'] }
}, {
  path: 'positions',
  loadChildren: () => import('./position/position.module').then(module => module.PositionModule),
  canActivate: [GuardService]
}, {
  path: 'resume',
  loadChildren: () => import('./resume/resume.module').then(module => module.ResumeModule),
  canActivate: [GuardService, AuthService],
  data: { roles: ['employee'] }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
