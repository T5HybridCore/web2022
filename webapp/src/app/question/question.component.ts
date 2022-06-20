import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  // View
  @ViewChild('emailSent')
  public readonly emailSent!: SwalComponent;

  // Form
  form: UntypedFormGroup;

  constructor(private apiService: ApiService, private router: Router) {
    // Form
    this.form = new UntypedFormGroup({
      'email': new UntypedFormControl('', [Validators.required, Validators.email]),
      'name': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'question': new UntypedFormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit() { }

  async question() {
    var q = {
      'name': this.form.value['name'],
      'contactEmail': this.form.value['email'],
      'question': this.form.value['question'],
      'date': new Date()
    };

    this.apiService.sendQuestion(q).subscribe(async result => {
      await this.emailSent.fire();
    });
  }

}
