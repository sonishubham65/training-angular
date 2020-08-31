import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }
  application;
  isLoading;
  ID;
  ngOnInit(): void {
    this.isLoading = true;
    this.ID = this.activatedRoute.snapshot.params.ID;
    console.log(this.ID)
    this.postService.application_detail(this.ID)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        this.application = response['data'];
      })
  }
  download() {
    this.isLoading = true;
    this.postService.download(this.ID)
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
