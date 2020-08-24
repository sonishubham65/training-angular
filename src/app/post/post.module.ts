import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { ListComponent } from './list/list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [

  ]
})
export class PostModule { }
