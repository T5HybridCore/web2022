import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { CustomersComponent } from './admin/customers/customers.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { SigninComponent } from './admin/signin/signin.component';
import { UsersComponent } from './admin/users/users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Attributes
  isAdmin: boolean = false;
  title: string = '';
  url: string = '';
  showSidebar: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Path    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.url = this.router.url;
    });
  }

  // On Activated
  onActivated(component: any) {
    this.isAdmin = component instanceof ProductsComponent || component instanceof CustomersComponent || component instanceof OrdersComponent
      || component instanceof UsersComponent || component instanceof ReportsComponent || component instanceof SigninComponent;

    if (this.isAdmin) {
      this.title = component.title;
      
      this.showSidebar = !(component instanceof SigninComponent);
    }
  }
}
