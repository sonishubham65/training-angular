import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form = this.fb.group({
    project_name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[A-Z a-z 0-9.&'$()-]+$/)
    ]],
    client_name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[A-Z a-z 0-9.&'$()-]+$/)
    ]],
    technologies: this.fb.array([]),
    technology: [''],
    role: ['', [
      Validators.required,
      Validators.pattern(/^(Trainee|Associate|Senior associate|Lead|Manager|Director)$/)
    ]],
    description: ['', [
      Validators.required,
      Validators.minLength(100),
      Validators.maxLength(1000),
      Validators.pattern(/^[A-Z a-z 0-9.'@# ,?"*&\r\t\n-]+$/)
    ]],
    status: ['', [
      Validators.required,
      Validators.pattern(/^(open|closed)$/)
    ]]
  })

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  separatorKeysCodes: number[] = [ENTER, COMMA];
  postID;
  ngOnInit(): void {
    this.postID = this.activatedRoute.snapshot.params.ID;
    this.isLoading = true;
    this.postService.get(this.postID)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        let data = response['data'];
        this.form.patchValue(data);
        data.technologies.forEach(element => {
          this.form.get('technologies').value.push(element);
        });
      })
  }

  isLoading = false;
  @ViewChild('chipList') chipList;
  add(blur?) {
    let value = this.form.get('technology').value;
    value = (value || '').trim();
    //check if blur
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
    if (this.form.status === 'VALID') {
      this.isLoading = true;
      delete this.form.value.technology
      this.postService.edit(this.postID, this.form.value)

        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )

        .subscribe(data => {
          //this.router.navigate(['/post'])
        })
    }
  }

}
