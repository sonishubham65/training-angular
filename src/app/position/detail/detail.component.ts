import { Component, OnInit } from '@angular/core';
import { PositionService } from '../position.service'
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  post;
  isLoading;
  constructor(
    private positionService: PositionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let _id = this.activatedRoute.snapshot.params.ID;
    this.isLoading = true;
    this.positionService.details(_id)
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

}
