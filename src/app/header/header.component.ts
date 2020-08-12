import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../account/profile.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.profileService.logout();
    this.router.navigate(['/'])
  }
}
