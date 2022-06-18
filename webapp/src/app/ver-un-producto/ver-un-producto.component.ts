import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProductoService } from '../shared/producto.service';
import { ApiService } from '../shared/services/api.service';
import { QR } from '../producto';
import {URLS} from '../misproductos'

@Component({
  selector: 'app-ver-un-producto',
  templateUrl: './ver-un-producto.component.html',
  styleUrls: ['./ver-un-producto.component.css'],
})
export class VerUnProductoComponent implements OnInit {
  //producto a imprimir
  product: any = {};
  //cantidad a comprar
  
  loadingProduct: boolean;

//generacion de QR aleatorio
  urls:QR[]=URLS;
  random:number=0;
  flag_qr:boolean=false;




  constructor(private router: ActivatedRoute, private api: ApiService) {
    console.log('dentro de ver producto CONSTRUCTOR ');
    this.loadingProduct = true;

         
      this.random=Math.floor(Math.random() * (9 - 0)) + 0;
      console.log("Numero aleatorio == " + this.random);      
      this.flag_qr=true;

    

    this.router.params.subscribe((params) => {
      this.getProduct(params['id']);
      //prueba en consola
      console.log('llego ' + params['id']);
    });
  }

  ngOnInit(): void {}

  //metodo que busca productos
  getProduct(id: string) {
    console.log('dentro de ver producto GETPRODUCT');
    this.loadingProduct = true;

    //se obtienen los datos del producto seleccionado
    this.api.getProduct(id).subscribe((product) => {
      console.log('ver producto PRODUCT = ' + product);
      console.log(product);

      //se meten los datos de la BD a nuestra variable
      this.product = product;

      //prueba en consola
      console.log(this.product.title);
      
      this.loadingProduct = false;
    });
  }


  //añadir productos al carrito
  addProduct_tocart_byid(amounts:string ) {
    /*this.api.addProduct(this.product.id, amounts).subscribe((product) => {
      console.log('ver producto PRODUCT = ' + product);
      console.log(product);

      //se meten los datos de la BD a nuestra variable
      this.product = product;

      //prueba en consola
      console.log(this.product.Title);
      console.log(this.product.Manufacturer);
      console.log(this.product.Price);
      this.loadingProduct = false;
    });*/

    
  }
}
