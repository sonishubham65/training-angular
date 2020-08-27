import { Component, OnInit } from '@angular/core';
import { PositionService } from '../position.service'
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ProfileService } from 'src/app/account/profile.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  post;
  postid;
  isLoading;
  constructor(
    private positionService: PositionService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) {
    this.postid = this.activatedRoute.snapshot.params.ID;
  }

  ngOnInit(): void {

    this.isLoading = true;
    this.positionService.details(this.postid)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        console.log(response)
        this.post = response['data']
      });
  }
  apply() {
    this.isLoading = true;
    this.positionService.apply(this.postid)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        console.log(response);
        this.post.application = true;
      });
  }
}
