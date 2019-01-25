import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private _httpService: HttpService, private _route:ActivatedRoute, private _router:Router) { }

  showProductsBool:boolean = false;
  showProducts:any;


  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this._httpService.getAllProducts().subscribe(data =>{
      console.log(data);
      this.showProductsBool = true;
      this.showProducts = data;
    })
  }

  deleteProduct(id){
    this._httpService.deleteSingleProduct(id).subscribe (data => {
      console.log(data);
    })
    this.getProducts();
  }



}
