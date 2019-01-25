import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'product_list', component: ProductListComponent},
  {path: 'product_list/:id', component: UpdateproductComponent},
  {path: 'new_product', component: ProductCreationComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'}, //redirect to root route if there is nothing in the url
  {path: '**', redirectTo: '/'} //** is a catchall if nothing is found and will redirect back to root
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, ProductCreationComponent, UpdateproductComponent, ProductCreationComponent, ProductListComponent]