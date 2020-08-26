import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service'
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
    private postService: PostService,
    private fb: FormBuilder,
  ) { }
  displayedColumns: string[] = ['project_name', 'client_name', 'role', 'status', 'created_at', 'action'];
  dataSource;
  total = 0;
  pageEvent: PageEvent;
  isLoading = false;
  pageIndex;
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
      this.postService.list(page + 1, this.form.value)
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


  delete(id) {
    console.log(id, this.isLoading)
    let response = confirm("Do you want to delete it?");
    if (response) {
      if (this.isLoading == false) {
        this.isLoading = true;

        this.postService.delete(id).pipe(
          finalize(() => {
            this.isLoading = false;
            this.list(this.pageIndex);
          })
        )
          .subscribe(response => {

          });
      }
    }
  }
}
