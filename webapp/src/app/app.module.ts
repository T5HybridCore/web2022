import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FruitsComponent } from './fruits/fruits.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { DairyComponent } from './dairy/dairy.component';
import { SearchComponent } from './search/search.component';
import { MycartComponent } from './mycart/mycart.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { VerUnProductoComponent } from './ver-un-producto/ver-un-producto.component';
import { FaqComponent } from './faq/faq.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './admin/products/products.component';
import { AnimationComponent } from './utils/animation/animation.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { PagetitleComponent } from './admin/pagetitle/pagetitle.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FruitsComponent,
    VegetablesComponent,
    DairyComponent,
    SearchComponent,
    MycartComponent,
    AboutComponent,
    ContactComponent,
    SignupComponent,
    VerUnProductoComponent,
    FaqComponent,
    ProductCardComponent,
    LoadingComponent,
    ProductsComponent,
    AnimationComponent,
    SidebarComponent,
    PagetitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
