import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
import { ProductsComponent } from './admin/products/products.component';
import { AnimationComponent } from './utils/animation/animation.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { PagetitleComponent } from './admin/pagetitle/pagetitle.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { HeaderComponent } from './admin/header/header.component';
import { SigninComponent } from './admin/signin/signin.component';
import { UsersComponent } from './admin/users/users.component';
import { QRCodeModule } from 'angularx-qrcode';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { GraphComponent } from './graph/graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoginComponent } from './login/login.component';

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
    PagetitleComponent,
    CustomersComponent,
    OrdersComponent,
    ReportsComponent,
    HeaderComponent,
    SigninComponent,
    UsersComponent,
    GraphComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    QRCodeModule,
    NgApexchartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
