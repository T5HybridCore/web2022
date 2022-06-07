import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  forma!: FormGroup;
  band=false;
  constructor() { 
    this.forma = new FormGroup({
      'name': new FormControl('',Validators.pattern("^[A-Za-z ]{3,40}$")),
      'lastname': new FormControl('',Validators.pattern("^[A-Za-z ]{3,40}$")),
      'mail': new FormControl('',Validators.email),
      'account': new FormControl('',Validators.pattern("^[A-Za-z0-9 $!%*#?&._-]{3,40}$")),
      'password': new FormControl('',Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$")),
      'password2': new FormControl('',Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"))
      
      });
      
  }

  ngOnInit(): void {
  }

  saveChanges():void{
    this.band=this.forma.get('password')?.value==this.forma.get('password2')?.value;
    console.log(this.forma);
    console.log(this.forma.value);
    }
    

}
