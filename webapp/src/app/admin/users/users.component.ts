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
      'phoneNumber': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'displayName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'photoUrl': new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  getUsers() {
    this.apiService.getUsers().subscribe((result: any) => {
      this.users = result;
      console.log(result);

    });
  }

  deleteUser(id: string) {
    this.apiService.deleteUser(id).subscribe((result: any) => {
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

        this.apiService.addUser(this.form.value).subscribe(async () => {
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
