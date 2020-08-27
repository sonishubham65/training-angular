import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListComponent as ApplicationListComponent } from './application/list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

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
  component: ApplicationListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
