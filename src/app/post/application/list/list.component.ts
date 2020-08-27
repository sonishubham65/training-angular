
import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../post.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'created_at', 'action'];
  dataSource;
  total = 0;
  pageEvent: PageEvent;
  isLoading = false;
  postID;
  post;

  pageIndex;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.postID = this.activatedRoute.snapshot.params.ID;
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
      this.postService.applications(this.postID, this.pageIndex)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(response => {
          this.post = response['data'].post;
          this.dataSource = response['data'].applications;
          this.total = response['data'].total;
        });
    }
  }
  download(id) {
    this.isLoading = true;
    this.postService.download(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response: HttpResponse<Blob>) => {
        let contentDisposition = response.headers.get('content-disposition');
        let filename = contentDisposition.split(";")[1].split("=")[1];
        var blob = new Blob([response.body], { type: 'octet/stream' });
        var url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = filename;
        anchor.href = url;
        anchor.click();
      })
  }
  changePage() {
    this.router.navigate([`post/${this.postID}/applications/`, (this.paginator.pageIndex + 1)])
  }
}
