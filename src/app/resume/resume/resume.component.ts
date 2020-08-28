import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResumeService } from '../resume.service'
import { ProfileService } from 'src/app/account/profile.service';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    public profileService: ProfileService
  ) { }
  isUploaded;
  isLoading;
  form = this.fb.group({
    resume: [null, Validators.required]
  });

  ngOnInit(): void {
  }
  onSubmit() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('resume', this.form.get('resume').value);
    this.resumeService.upload(formData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(data => {
        this.isUploaded = true;
      });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.form.get('resume').setValue(file);
  }

  download() {
    this.isLoading = true;
    this.resumeService.download().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
      .subscribe((response: HttpResponse<Blob>) => {
        let contentDisposition = response.headers.get('content-disposition');
        let filename = contentDisposition.split(";")[1].split("=")[1];
        var blob = new Blob([response.body], { type: 'octet/stream' });
        var url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = filename;
        anchor.href = url;
        anchor.click();
      });
  }
}
