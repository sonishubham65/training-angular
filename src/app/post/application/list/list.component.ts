
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {
    this.postID = this.activatedRoute.snapshot.params.ID;
  }
  ngOnInit(): void {
    this.list(0);
  }
  list(page) {
    if (this.isLoading == false) {
      this.isLoading = true;
      this.postService.applications(this.postID, page + 1)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(response => {
          console.log(response)
          this.post = response['data'].post;
          this.dataSource = response['data'].applications;
          this.total = response['data'].total;
          console.log(this.total)
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
}
