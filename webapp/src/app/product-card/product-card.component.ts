import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @Input() items: any[] = [];

  seeProduct(item: any) {

    console.log("method seeProduct of card component");
    let productId;

    if (item.type === 'product') {
      productId = item.id;
    } else { 
      productId = item.products[0].id; 
    }
     this.router.navigate(['/product', productId]);
  }

  showCard(item:any){
    console.log("method showcard of card component");
     return item && item.images && item.images.length > 0 
    }

}
