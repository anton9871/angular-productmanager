import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpService } from './http.service'; //
import {HttpClientModule} from '@angular/common/http'; //
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module'; //routingComponents holds an array of all the components in the routing module
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    AppComponent,
    routingComponents

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, //
    RouterModule
  ],
  providers: [HttpService], //
  bootstrap: [AppComponent]
})
export class AppModule { }
