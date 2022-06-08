import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../shared/producto.service';

@Component({
  selector: 'app-ver-un-producto',
  templateUrl: './ver-un-producto.component.html',
  styleUrls: ['./ver-un-producto.component.css']
})
export class VerUnProductoComponent implements OnInit {

  @Input() producto!:Producto;
  
  constructor(public productoService:ProductoService, public activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params =>{
      this.producto=productoService.getUnProducto(params['id']);
      
    })

   }

  ngOnInit(): void {
  }

}
