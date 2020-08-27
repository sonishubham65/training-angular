import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PositionService } from '../position.service'
import { MatPaginator } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  total = 0;
  isLoading = false;
  dataSource;
  pageIndex;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private positionService: PositionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(data => {
      this.pageIndex = data.page;
      this.list();
    });
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.paginator.initialized.subscribe(() => {
      this.paginator.pageIndex = this.pageIndex - 1;
    })
  }

  list() {
    if (this.isLoading == false) {
      this.isLoading = true;
      this.positionService.list(this.pageIndex)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(response => {
          this.dataSource = response['data'].posts;
          this.total = response['data'].total;
        });
    }
  }
  changePage() {
    this.router.navigate(['positions/', (this.paginator.pageIndex + 1)])
  }
}
