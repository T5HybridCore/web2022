import { Component, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EMPTY, map, Observable, Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.css']
})
export class CustomerordersComponent implements OnInit, OnDestroy {
  // Attributes
  public readonly user: Observable<User | null> = EMPTY;
  private readonly userDisposable: Subscription | undefined;

  // Orders
  orders?: any[];
  shouldRender: boolean = false;

  constructor(@Optional() private auth: Auth, private api: ApiService, private router: Router) {
    // Active session
    if (auth) {
      this.user = authState(this.auth);

      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        if (!isLoggedIn) router.navigate(['/home']);
        else {
          this.user.subscribe(usr => {
            api.getOrders().subscribe((orders: any) => {
              this.orders = [];
              orders.forEach((order: any) => {
                if (order.customer === usr?.uid) {
                  order.quantity = 0;
                  order.total = 0;

                  var productNames: any [] = [];

                  order.products.forEach((item: any) => {
                    api.getProduct(item.product).subscribe((product: any) => {
                      productNames.push(product.title);
                      order.productNames = productNames.join(', ');
                    });

                    order.quantity += item.quantity;
                    order.total += item.quantity * item.price;
                  });
                  
                  this.orders!.push(order);
                }
              });
              this.shouldRender = true;
            });
          })
        }
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }
}
