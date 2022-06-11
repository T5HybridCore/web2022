import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../shared/producto.service';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-ver-un-producto',
  templateUrl: './ver-un-producto.component.html',
  styleUrls: ['./ver-un-producto.component.css']
})
export class VerUnProductoComponent implements OnInit {

  product: any = {};
  loadingProduct: boolean;
  
  constructor(private router: ActivatedRoute, private api: ApiService) {

    this.loadingProduct = true;
    console.log("dentro de ver producto CONSTRUCTOR ");
    this.router.params.subscribe(params => {
      this.getProduct(params['id']);
    
      console.log("llego " + params['id']);
    });
  }

  ngOnInit(): void { }

  getProduct(id: string) {
    console.log("dentro de ver producto GETPRODUCT");
    this.loadingProduct = true;
    this.api.getProduct(id).subscribe(product => {
      console.log("ver producto PRODUCT = "+ product);
      console.log(product);
      
      this.product = product; 
      console.log(this.product.Title );
      console.log(this.product.Manufacturer );
      console.log(this.product.Price );
      this.loadingProduct = false;

    });
  }

  
}
