import { Component, OnInit, ViewChild } from '@angular/core';
import { PositionService } from '../position.service'
import { MatPaginator } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

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
  isLoading = false;
  pageIndex;
  dataSource;
  form = this.fb.group({
    _id: [''],
    project_name: ['']
  })
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.list(0);
  }
  list(page) {
    if (this.paginator) {
      this.paginator.pageIndex = page;
    }
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
