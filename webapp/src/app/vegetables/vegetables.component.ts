import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css'],
})
export class VegetablesComponent implements OnInit {
  products: any[] = [];
  flag?: boolean;

  constructor(private api: ApiService, private router: Router) {
    console.log('search');
    this.flag = true;

    this.api.getAllProducts().subscribe((data: any) => {
      console.log('search this api gets');
      this.products = data;
      console.log('this.products ' + this.products);
      this.flag = false;
    });
  }

  ngOnInit(): void {}

  seeProduct(item: any) {
    console.log('method seeProduct');
    let productId;
    productId = item.id;
    console.log('productId == ' + productId);
    this.router.navigate(['/product', productId]);
  }

  showCard(item: any) {
    console.log('method showcard of card component');
    console.log(item);
    return item;
  }
}
