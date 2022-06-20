import { Component, OnInit, Inject } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule,FormBuilder,   ValidatorFn, AbstractControl, ValidationErrors,  } from '@angular/forms';

/* import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; */
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  modal: any;
  
constructor( ) {
 
  this.form = new UntypedFormGroup({
    'email': new UntypedFormControl('',[Validators.required,Validators.email]),
    'password': new UntypedFormControl('',[Validators.required,Validators.minLength(5)]),
  });
  
}

    ngOnInit() {
     
    }
    closeModal() {
      this.modal.hide();
    }
  
}
