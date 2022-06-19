import { Component, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EMPTY, map, Observable, Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit, OnDestroy {
  // View
  @ViewChild('productDeleted')
  public readonly productDeleted!: SwalComponent;
  @ViewChild('paidOrder')
  public readonly paidOrder!: SwalComponent;

  // Attributes
  public readonly user: Observable<User | null> = EMPTY;
  private readonly userDisposable: Subscription | undefined;

  // Cart
  cart?: any[];

  // Counters
  quantity: number = 0;
  total: number = 0;

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
            api.getCart(usr?.uid ?? '').subscribe((cart: any) => {
              this.cart = [];

              cart.products.forEach((item: any) => {
                api.getProduct(item.product).subscribe((product: any) => {
                  this.cart!.push({
                    'id': item.product,
                    'title': product.title,
                    'picture': product.picture,
                    'price': item.price,
                    'quantity': item.quantity
                  });
                  this.calculate();
                });
              });
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

  calculate() {
    this.quantity = 0;
    this.total = 0;

    this.cart!.forEach(item => {
      this.quantity += item.quantity;
      this.total += item.price * item.quantity;
    });
  }

  // Create new cart
  createCart(): any[] {
    var cart: any[] = [];
    this.cart?.forEach(item => {
      cart.push({
        'product': item.id,
        'quantity': item.quantity,
        'price': item.price
      });
    });

    return cart;
  }

  async deleteProduct(id: string) {
    this.cart = this.cart!.filter(function (obj) {
      return obj.id !== id;
    });

    // Update cart
    this.api.addToCart({
      'id': this.auth.currentUser?.uid,
      'products': this.createCart()
    }).subscribe(async (result: any) => {
      await this.productDeleted.fire();
      this.calculate();
    });
  }

  async pay() {
    var order = {
      'customer': this.auth.currentUser?.uid,
      'products': this.createCart(),
      'date': new Date(),
      'status': 0
    };

    this.api.addOrder(order).subscribe(async (result: any) => {
      // Update cart
      this.api.addToCart({
        'id': this.auth.currentUser?.uid,
        'products': []
      }).subscribe(async (result: any) => {
        await this.paidOrder.fire();
        this.cart = [];
        this.calculate();
      });
    });
  }
}
