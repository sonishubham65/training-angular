import { Component, OnInit } from '@angular/core';
import { PositionService } from '../position.service'
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private positionService: PositionService,
    private fb: FormBuilder,
  ) { }
  total = 0;
  pageEvent: PageEvent;
  isLoading = false;
  pageIndex;
  dataSource;
  form = this.fb.group({
    _id: [''],
    project_name: ['']
  })
  ngOnInit(): void {
    this.list(0);
  }
  list(page) {
    this.pageIndex = page;
    if (this.isLoading == false) {
      this.isLoading = true;
      this.positionService.list(page + 1, this.form.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(response => {
          console.log(response)
          this.dataSource = response['data'].posts;
          this.total = response['data'].total;
          console.log(this.total)
        });
    }

  }
}
