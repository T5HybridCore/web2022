import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { NavigationEnd, Router } from '@angular/router';
import { EMPTY, filter, map, Observable, Subscription } from 'rxjs';

import { CustomersComponent } from './admin/customers/customers.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { SigninComponent } from './admin/signin/signin.component';
import { UsersComponent } from './admin/users/users.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // Attributes
  isAdmin: boolean = false;
  title: string = '';
  url: string = '';
  showNavbar: boolean = true;
  showSidebar: boolean = false;
  loggedIn: boolean = false;

  // Auth
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  constructor(@Optional() private auth: Auth, private router: Router) {
    if (auth) {
      this.user = authState(this.auth);
      
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
      });
    }
  }

  ngOnInit(): void {
    // Path    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.url = this.router.url;
    });
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  // On Activated
  onActivated(component: any) {
    this.isAdmin = component instanceof ProductsComponent || component instanceof CustomersComponent || component instanceof OrdersComponent
      || component instanceof UsersComponent || component instanceof ReportsComponent || component instanceof SigninComponent;

    if (this.isAdmin) {
      this.title = component.title;

      if (!this.loggedIn) {
        if (!(component instanceof SigninComponent)) this.router.navigate(['/admin/signin']);
      }
      
      this.showSidebar = !(component instanceof SigninComponent);
    } else if(component instanceof SignupComponent) this.showNavbar = false;
  }
}
