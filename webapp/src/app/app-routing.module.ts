import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FruitsComponent } from './fruits/fruits.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { DairyComponent } from './dairy/dairy.component';
import { MycartComponent } from './mycart/mycart.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'fruits', component: FruitsComponent},
{path: 'vegetables', component: VegetablesComponent},
{path: 'dairy', component: DairyComponent},
{path: 'mycart', component: MycartComponent},
{path: 'about', component: AboutComponent},
{path: 'search', component: SearchComponent},
{path: 'contact', component: ContactComponent},
{path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
