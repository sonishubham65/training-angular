import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../account/profile.service'
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public profileService: ProfileService,
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.profileService.logout();
    this.router.navigate(['/']);
    this.socketService.disconnect();
    this.socketService.connect();
  }
}
