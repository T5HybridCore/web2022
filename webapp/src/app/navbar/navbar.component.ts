import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
declare var window: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modal: any;
  constructor(private modalService: NgbModal) { }
  ngOnInit(): void {
    this.modal = new window.bootstrap.Modal(
      document.getElementById('ModalForm')
    );

  }
  openLoginForm(): void{
    this.modal.show();
   }
       
   

}
