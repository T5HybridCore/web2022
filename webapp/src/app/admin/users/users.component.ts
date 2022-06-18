import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ApiService } from 'src/app/shared/services/api.service';
declare var window: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // Properties
  title = 'Users';

  // View
  @ViewChild('userAdded')
  public readonly userAdded!: SwalComponent;
  @ViewChild('userUpdated')
  public readonly userUpdated!: SwalComponent;

  // Attributes
  users?: any[];
  isNew: boolean = false;

  // Modal & form
  modal: any;
  form: FormGroup;

  constructor(private apiService: ApiService) {
    this.form = new FormGroup({
      'uid': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phoneNumber': new FormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      'password': new FormControl('', Validators.minLength(8)),
      'displayName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'photoURL': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'disabled': new FormControl('', [Validators.required])
    });
  }

  // OnInit
  ngOnInit(): void {
    // Modal
    this.modal = new window.bootstrap.Modal(
      document.getElementById('modal')
    );

    this.getUsers();
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getUsers() {
    this.apiService.getUsers().subscribe((result: any) => {
      this.users = [];
      result.forEach((user: any) => {
        user.password = '';
        delete user['emailVerified'];
        delete user['metadata'];
        delete user['passwordHash'];
        delete user['passwordSalt'];
        delete user['customClaims'];
        delete user['tokensValidAfterTime'];
        delete user['providerData'];
        user['phoneNumber'] = user['phoneNumber'].substring(3);
        this.users?.push(user);        
      });
    });
  }

  deleteUser(uid: string) {
    this.apiService.deleteUser(uid).subscribe((result: any) => {
      this.getUsers();
    });
  }

  // Modal
  openModal(user: any): void {
    this.isNew = user === null;

    // On update/new
    if (!this.isNew) {
      this.form.setValue(user);
    } else {
      this.form.controls['password'].addValidators(Validators.required);
      this.form.reset();
      this.form.patchValue({ uid: 0 }); // Id fix on save
    }

    this.modal.show();
  }

  closeModal() {
    // Validate
    if (this.form.valid) {

      if (this.isNew) {
        let user = this.form.value;
        delete user['uid'];

        this.apiService.addUser(user).subscribe(async () => {
          await this.userAdded.fire();
          this.getUsers();
        });
      } else {
        this.apiService.updateUser(this.form.value).subscribe(async () => {
          await this.userUpdated.fire();
          this.getUsers();
        });
      }

      this.modal.hide();
    }
  }
}
