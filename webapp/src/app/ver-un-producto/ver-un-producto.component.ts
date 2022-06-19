import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-ver-un-producto',
  templateUrl: './ver-un-producto.component.html',
  styleUrls: ['./ver-un-producto.component.css'],
})
export class VerUnProductoComponent implements OnInit {
  // View
  @ViewChild('added')
  public readonly added!: SwalComponent;

  // Attributes
  public readonly user: Observable<User | null> = EMPTY;

  //producto a imprimir
  product: any = {};
  //cantidad a comprar
  amount: number = 0;

  loadingProduct: boolean;

  //generacion de QR aleatorio
  urls: any[] = [];
  random: number = 0;
  flag_qr: boolean = false;




  constructor(@Optional() private auth: Auth, private api: ApiService, private router: ActivatedRoute) {
    console.log('dentro de ver producto CONSTRUCTOR ');
    this.loadingProduct = true;


    this.random = Math.floor(Math.random() * (9 - 0)) + 0;
    console.log("Numero aleatorio == " + this.random);




    this.router.params.subscribe((params) => {
      this.getProduct(params['id']);
      //prueba en consola
      console.log('llego ' + params['id']);
    });

    // Auth
    if (auth) {
      this.user = authState(this.auth);
    }
  }

  ngOnInit(): void {
    this.api.getRecipes().subscribe((result: any) => {
      console.log(result);
      this.urls = result;
      console.log("urls == " + this.urls[this.random].url);
      this.flag_qr = true;
    });
  }

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
  addProduct_tocart_byid(amounts: number) {
    // Get cart
    this.api.getCart(this.auth.currentUser?.uid ?? '').subscribe((cart: any) => {
      if (cart) {
        cart.products.push({
          'product': this.product.id,
          'quantity': amounts,
          'price': this.product.price
        });
        this.api.addToCart(cart).subscribe(async(result: any) => {
          await this.added.fire();
          this.amount = 0;
        });
      }
    });
  }
}
