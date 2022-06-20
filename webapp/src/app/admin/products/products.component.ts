import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
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

  // View
  @ViewChild('productAdded')
  public readonly productAdded!: SwalComponent;
  @ViewChild('productUpdated')
  public readonly productUpdated!: SwalComponent;

  // Attributes
  products?: any[];
  isNew: boolean = false;
  previewTitle: string = '';
  previewImgSrc: string = '';

  // Modal & form
  modal: any;
  modalPreview: any;
  form: UntypedFormGroup;

  // Constructor
  constructor(private apiService: ApiService) {
    this.form = new UntypedFormGroup({
      'id': new UntypedFormControl('', [Validators.required]),
      'title': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'category': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'subCategory': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'manufacturer': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'contents': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'price': new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0.01)]),
      'stock': new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
      'organic': new UntypedFormControl('', [Validators.required]),
      'picture': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'description': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  // OnInit
  ngOnInit(): void {

    // Modal
    this.modal = new window.bootstrap.Modal(
      document.getElementById('modal')
    );

    this.modalPreview = new window.bootstrap.Modal(
      document.getElementById('modalPreview')
    );

    this.getProducts();
  }

  getProducts() {
    this.apiService.getProducts().subscribe((result: any) => {
      this.products = result;      
    });
  }

  deleteProduct(id: string) {
    this.apiService.deleteProduct(id).subscribe((result: any) => {
      this.getProducts();
    });
  }

  // Modal
  openModal(product: any): void {
    this.isNew = product === null;

    // On update/new
    if (!this.isNew) {
      this.form.setValue(product);
    } else {
      this.form.reset();
      this.form.patchValue({id: 0}); // Id fix on save
    }

    this.modal.show();
  }

  closeModal() {
    // Validate
    if (this.form.valid) {
      
      if (this.isNew) {
        let product = this.form.value;
        delete product['id'];

        this.apiService.addProduct(this.form.value).subscribe(async () => {
          await this.productAdded.fire();
          this.getProducts();
        });
      } else {
        this.apiService.updateProduct(this.form.value).subscribe(async () => {
          await this.productUpdated.fire();
          this.getProducts();
        });
      }

      this.modal.hide();
    }
  }

  openPreviewModal(product: any): void {
    this.previewTitle = product.title;
    this.previewImgSrc = product.picture;
    this.modalPreview.show();
  }
}
