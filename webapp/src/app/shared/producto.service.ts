import { Injectable } from '@angular/core';
import { PRODUCTOS } from '../misproductos';
import { Producto } from '../producto';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private productos:Producto[]=PRODUCTOS;

  constructor() { }


  getUnProducto(posicion:number):Producto{
    return this.productos[posicion];
  }

  searchUnProducto(nomproducto:string):number{
    let index = this.productos.findIndex(p=> p.titulo === nomproducto);
    return index;
  }

  getProductos():Producto[]{
    return this.productos;
  }

}
