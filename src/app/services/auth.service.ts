import { Injectable } from '@angular/core';
import { ProfileService } from '../account/profile.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let roles = route.data["roles"];
    console.log(roles);
    if (roles.indexOf(this.profileService.user.role) >= 0) {
      return true;
    }
    this.router.navigate(['/account/login']);
    return false;

  }
}
