import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors,  } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  title = 'formreactivos';
  forma!: FormGroup;
  usuario:any={
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    password2:"",
    address:"",
    city:"",
    }
  
  constructor(){
    this.forma = new FormGroup({
      'firstname': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'lastname': new FormControl('', [Validators.required, Validators.minLength(3)]  ),
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',[Validators.required,Validators.minLength(5)]),
    'password2': new FormControl('',[Validators.required,Validators.minLength(5)]),
    'address': new FormControl('',[Validators.required,Validators.minLength(3)]),
    'city': new FormControl('', [Validators.required, Validators.minLength(3)]  ),
    }, { 
      validators: this.checkPasswords
    });    
    this.forma.setValue(this.usuario);
  }
  guardarCambios():void{
    console.log("metodo guardarCambios");
    console.log(this.forma);
    console.log(this.forma.value);
    this.forma.reset({
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      password2:'',
      address:'',
      city:'',
      });//inicializar vacíos los campos
  } 
  
  
    ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
    
    }
    checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
      let pass = group.get('password')!.value;
      let confirmPass = group.get('password2')!.value
    
      return pass === confirmPass ? null : { notSame: true }
    }
}
