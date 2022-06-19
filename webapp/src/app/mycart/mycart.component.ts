import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

    //carrito a imprimir
    cart: any = {};
    //producto a imprimir 
    product: any = {};

    //variables de conteo
    counter:number=0;
    accumulator:number=0;

  //bandera marca cuando esta disponible el carrito
  loadingCart: boolean;

  ngOnInit(): void {
  }

  constructor(private router: ActivatedRoute, private api: ApiService) {

    //buscar el carrito del usuario por id, regresa id de productos
    this.loadingCart = true;
    console.log("dentro de CART CONSTRU");
    
    this.router.params.subscribe(params => {
      this.getProduct(params['id']);
    
      //prueba en consola
      console.log("llego " + params['id']);
    });
  }

  getProduct(id: string) {

    console.log("dentro get CART");
    this.loadingCart = false;

    //se obtienen los datos del carrito seleccionado
    this.api.getProduct(id).subscribe(product => {
      console.log("ver producto PRODUCT = "+ product);
      console.log(product);
      
      //se meten los datos de la BD a nuestra variable
      this.product = product; 

      //prueba en consola
      console.log(this.product.Title );
      console.log(this.product.Manufacturer );
      console.log(this.product.Price );
      this.loadingCart = false;

    });
  }




}
