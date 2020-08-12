import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) {
  }
  form = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[A-Z a-z 0-9.]+$/)
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|in|net)$")
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,30}$")
    ]],
    role: ['', [
      Validators.required,
      Validators.pattern(/^(employee|manager)$/)
    ]]
  })
  isLoading = false;
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.form.status === 'VALID') {
      this.isLoading = true;
      this.accountService.register(this.form.value)

        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )

        .subscribe(
          res => {
            this.form.reset();
            if (res.status == 201) {
              this.toastr.success('', "Please login to continue.");
              this.router.navigate(['/account/login'])
            }
          },

          error => {
            console.log(error)
          }
        )
    }
  }

}
