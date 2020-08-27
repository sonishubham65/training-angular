import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [{
  path: '',
  redirectTo: '1',
  pathMatch: 'full'
}, {
  path: ':page',
  component: ListComponent
}, {
  path: 'detail/:ID',
  component: DetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
