import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
declare var window: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Properties
  title = 'Products';

  // Attributes
  products?: any[];
  isNew: boolean = false;

  // Modal & form
  modal: any;
  form: FormGroup;

  // Constructor
  constructor(private apiService: ApiService) {
    this.form = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'category': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'subCategory': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'manufacturer': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'contents': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'price': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0.01)]),
      'organic': new FormControl('', [Validators.required]),
      'picture': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  // OnInit
  ngOnInit(): void {

    // Modal
    this.modal = new window.bootstrap.Modal(
      document.getElementById('modal')
    );

    this.apiService.getAllProducts().subscribe((result: any) => {
      this.products = result;
    });
  }

  // Modal
  openModal(product: any): void {
    this.isNew = product === null;

    // On update/new
    if (!this.isNew) {
      delete product['id']; // Id fix
      this.form.setValue(product);
    } else this.form.reset();

    this.modal.show();
  }

  closeModal(): void {
    // Validate
    if (this.form.valid) {
      console.log(this.form.value);
      this.modal.hide();
    }
  }

  openPreviewModal(product: any): void {

  }
}
