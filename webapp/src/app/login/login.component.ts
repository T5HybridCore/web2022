import { Component, OnInit, Inject } from '@angular/core';

import { FormControl, FormGroup, Validators, ReactiveFormsModule,FormBuilder,   ValidatorFn, AbstractControl, ValidationErrors,  } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  modal: any;
  
constructor( ) {
 
  this.form = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',[Validators.required,Validators.minLength(5)]),
  });
  
}

    ngOnInit() {
     
    }
    closeModal() {
      this.modal.hide();
    }
  
}
