import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ApiService } from 'src/app/shared/services/api.service';
declare var window: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  // Properties
  title = 'Orders';

  // View
  //@ViewChild('productAdded')
  //public readonly productAdded!: SwalComponent;
  @ViewChild('orderUpdated')
  public readonly orderUpdated!: SwalComponent;

  // Attributes
  orders?: any[];

  // Modal & form
  modal: any;
  form: UntypedFormGroup;

  // Constructor
  constructor(private apiService: ApiService) {
    this.form = new UntypedFormGroup({
      'id': new UntypedFormControl(''),
      'status': new UntypedFormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Modal
    this.modal = new window.bootstrap.Modal(
      document.getElementById('modal')
    );

    this.getOrders();
  }

  getOrders() {
    this.apiService.getOrders().subscribe((orders: any) => {
      this.orders = [];
      orders.forEach((order: any) => {
        this.apiService.getCustomer(order.customer).subscribe((customer: any) => {
          order.customerName = customer.displayName;
          order.productsSize = order.products.length;
          order.total = 0;

          // Products
          order.products.forEach((product: any) => {
            order.total += product.price * product.quantity;
          });

          this.orders?.push(order);
        });
      });
    });
  }

  deleteOrder(id: string) {
    this.apiService.deleteOrder(id).subscribe((result: any) => {
      this.getOrders();
    });
  }

  // Modal
  openModal(order: any): void {
    // On update/new
    this.form.setValue({ id: order.id, status: order.status });
    this.modal.show();
  }

  closeModal() {
    // Validate
    if (this.form.valid) {
      this.apiService.getOrder(this.form.value['id']).subscribe((order: any) => {
        order.status = this.form.value['status'];
        this.apiService.updateOrder(order).subscribe(async () => {
          await this.orderUpdated.fire();
          this.getOrders();
        });
  
        this.modal.hide();
      });
    }
  }
}