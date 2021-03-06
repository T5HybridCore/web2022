import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators, UntypedFormControl, ValidatorFn, AbstractControl, ValidationErrors, } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Form
  form: UntypedFormGroup;

  constructor(private apiService: ApiService, private router: Router) {
    // Form
    this.form = new UntypedFormGroup({
      'displayName': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'email': new UntypedFormControl('', [Validators.required, Validators.email]),
      'password': new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      'address': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'city': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
    }, {
      validators: this.mustMatch
    });
  }

  ngOnInit() { }

  signUp(): void {
    if (this.form.valid) {
      this.apiService.addCustomer(this.form.value).subscribe(async () => {
        this.router.navigate(['/home']);
      });
    }
  }

  mustMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { mustMatch: true }
  }
}
