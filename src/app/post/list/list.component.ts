import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service'
import { MatPaginator } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['project_name', 'client_name', 'role', 'status', 'created_at', 'updated_at', 'action'];
  dataSource;
  total = 0;
  isLoading = false;
  pageIndex;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private postService: PostService,
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
      this.postService.list(this.pageIndex)
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


  delete(id) {
    let response = confirm("Do you want to delete it?");
    if (response) {
      if (this.isLoading == false) {
        this.isLoading = true;

        this.postService.delete(id)
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.list();
            })
          )
          .subscribe(response => {

          });
      }
    }
  }
  changePage() {
    this.router.navigate(['post/page/', (this.paginator.pageIndex + 1)])
  }
}
