import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ProfileService } from '../account/profile.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (!this.profileService.user) {
      this.router.navigate(['account/login']);
      return false;
    }
    return true;
  }
}
