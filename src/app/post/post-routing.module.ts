import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListComponent as ApplicationListComponent } from './application/list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './application/detail/detail.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'page/1'
}, {
  path: 'page/:page',
  component: ListComponent
}, {
  path: 'add',
  component: AddComponent
}, {
  path: 'edit/:ID',
  component: EditComponent
}, {
  path: ':ID/applications',
  redirectTo: ':ID/applications/1'
}, {
  path: ':ID/applications/:page',
  component: ApplicationListComponent
}, {
  path: 'application/:ID',
  component: DetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
