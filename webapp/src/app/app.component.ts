import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { ProductsComponent } from './admin/products/products.component';

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
    this.isAdmin = (component instanceof ProductsComponent);

    // Delete
    if (component instanceof ProductsComponent) {
      this.title = component.title;
    }
  }
}
