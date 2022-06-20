import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ApiService } from 'src/app/shared/services/api.service';
declare var window: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  // Properties
  title = 'Customers';

  // View
  @ViewChild('userAdded')
  public readonly customerAdded!: SwalComponent;
  @ViewChild('userUpdated')
  public readonly customerUpdated!: SwalComponent;

  // Attributes
  customers?: any[];
  isNew: boolean = false;

  // Modal & form
  modal: any;
  form: UntypedFormGroup;

  constructor(private apiService: ApiService) {
    this.form = new UntypedFormGroup({
      'uid': new UntypedFormControl('', [Validators.required]),
      'email': new UntypedFormControl('', [Validators.required, Validators.email]),
      'phoneNumber': new UntypedFormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      'password': new UntypedFormControl('', Validators.minLength(8)),
      'displayName': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'photoURL': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'disabled': new UntypedFormControl('', [Validators.required])
    });
  }

  // OnInit
  ngOnInit(): void {
    // Modal
    this.modal = new window.bootstrap.Modal(
      document.getElementById('modal')
    );

    this.getCustomers();
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getCustomers() {
    this.apiService.getCustomers().subscribe((result: any) => {
      this.customers = [];
      result.forEach((user: any) => {
        user.password = '';
        delete user['emailVerified'];
        delete user['metadata'];
        delete user['passwordHash'];
        delete user['passwordSalt'];
        delete user['customClaims'];
        delete user['tokensValidAfterTime'];
        delete user['providerData'];
        if (user['phoneNumber']) user['phoneNumber'] = user['phoneNumber'].substring(3);
        this.customers?.push(user);        
      });
    });
  }

  deleteCustomer(uid: string) {
    this.apiService.deleteCustomer(uid).subscribe((result: any) => {
      this.getCustomers();
    });
  }

  // Modal
  openModal(customer: any): void {
    this.isNew = customer === null;

    // On update/new
    if (!this.isNew) {
      if (!customer['phoneNumber']) customer['phoneNumber'] = '';
      if (!customer['photoURL']) customer['photoURL'] = '';
      this.form.setValue(customer);
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

        this.apiService.addCustomer(user).subscribe(async () => {
          await this.customerAdded.fire();
          this.getCustomers();
        });
      } else {
        this.apiService.updateCustomer(this.form.value).subscribe(async () => {
          await this.customerUpdated.fire();
          this.getCustomers();
        });
      }

      this.modal.hide();
    }
  }
}
