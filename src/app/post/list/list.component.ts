import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private postService: PostService) { }
  displayedColumns: string[] = ['project_name', 'client_name', 'role', 'status', 'created_at', '_id'];
  dataSource;
  page = 1;
  total = 0;
  filter = {};
  ngOnInit(): void {
    this.list()
  }
  list() {
    this.postService.list(this.page, this.filter).subscribe(response => {
      console.log(response)
      this.dataSource = response['data'].posts;
      this.total = response['data'].total;
    });
  }
  delete(_id) {
    alert(_id);
  }

}
