import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ProfileService } from '../../account/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private accountService: AccountService,
    private profileService: ProfileService,) {
  }
  form = this.fb.group({
    email: ['manager@nagarro.com', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|in|net)$")
    ]],
    password: ['Pass@123', [
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
            this.form.reset();
            this.profileService.user = res['data'];
            this.profileService.token = res['token'];
            if (res['data'].role === 'manager') {
              this.router.navigate(['/post'])
            }
          },
          error => {
            console.log(error)
          }
        )
    }
  }
}
