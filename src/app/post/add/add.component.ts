import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  form = this.fb.group({
    project_name: ['M30', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[A-Z a-z 0-9.&'$()-]+$/)
    ]],
    client_name: ['Nagarro', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[A-Z a-z 0-9.&'$()-]+$/)
    ]],
    technologies: this.fb.array(['FB']),
    technology: [''],
    role: ['trainee', [
      Validators.required,
      Validators.pattern(/^(trainee|associate|senior_associate|lead|manager|director)$/)
    ]],
    description: ['A regular expression is a sequence of characters that define a search pattern. Usually such patterns are used by string-searching algorithms for "find" or "find and replace" operations on strings, or for input validation. It is a technique developed in theoretical computer science and formal language theory. ', [
      Validators.required,
      Validators.minLength(100),
      Validators.maxLength(1000),
      Validators.pattern(/^[A-Z a-z 0-9.'@# ,?"*&-]+$/)
    ]],
    status: ['open', [
      Validators.required,
      Validators.pattern(/^(open|close)$/)
    ]]
  })

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private toastr: ToastrService,
    private router: Router
  ) {

  }
  separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
    setTimeout(() => {
      if (this.form.get('technologies').value.length == 0)
        this.form.get('technologies').setErrors({ 'required': true })
    }, 100);
  }

  isLoading = false;
  @ViewChild('chipList') chipList;
  add(blur?) {
    let value = this.form.get('technology').value;
    console.log(value)
    value = (value || '').trim();
    if (blur && this.form.get('technologies').value.length == 0) {
      this.chipList.errorState = true;
      this.form.get('technologies').setErrors({ 'length': this.form.get('technologies').value.length })
    }
    // Add tech
    let index = this.form.get('technologies').value.find(tech => tech.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    if (value && index === undefined) {
      this.form.get('technologies').value.push(value);
    }
    // Reset the input value
    this.form.get('technology').setValue('')
    if (this.form.get('technologies').value.length > 0) {
      this.chipList.errorState = false;
      this.form.get('technologies').setErrors(null)
    }
  }

  remove(tech: string): void {
    const index = this.form.get('technologies').value.indexOf(tech);
    if (index >= 0) {
      this.form.get('technologies').value.splice(index, 1);
    }
    if (this.form.get('technologies').value.length == 0) {
      this.chipList.errorState = true;
      this.form.get('technologies').setErrors({ 'required': true })
    }
  }
  onSubmit() {
    console.log(this.form);
    if (this.form.status === 'VALID') {
      this.isLoading = true;
      delete this.form.value.technology
      this.postService.add(this.form.value)

        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )

        .subscribe(data => {
          this.router.navigate(['/post'])
        })
    }
  }
}
