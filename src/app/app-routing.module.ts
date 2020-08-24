import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'account',
  loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
}, {
  path: 'post',
  loadChildren: () => import('./post/post.module').then(module => module.PostModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
