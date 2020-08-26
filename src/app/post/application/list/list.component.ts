
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
          this.dataSource = response['data'].applications;
          this.total = response['data'].total;
          console.log(this.total)
        });
    }
  }
  download(id) {

  }
}
