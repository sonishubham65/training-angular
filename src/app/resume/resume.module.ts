import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeComponent } from './resume/resume.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ResumeComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ResumeModule { }
