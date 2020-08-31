import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ProfileService } from '../../account/profile.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private profileService: ProfileService,
    private socketService: SocketService) {
  }
  form = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|in|net)$")
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,30}$")
    ]]
  })
  isLoading = false;
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.form.status === 'VALID') {
      this.isLoading = true;
      this.accountService.login(this.form.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          res => {
            this.profileService.token = res['token'];

            this.profileService.getProfile()
              .pipe(
                finalize(() => {
                  this.isLoading = false;
                })
              )
              .subscribe(res => {
                this.form.reset();
                if (res['data'].role === 'manager') {
                  this.router.navigate(['/post'])
                } else if (res['data'].role === 'employee') {
                  this.router.navigate(['/positions'])
                }
                this.socketService.disconnect();
                this.socketService.connect();
              });
          }
        )
    }
  }
}
