import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {
  product:any; //creating new product
  validationError:Boolean = false; //form validation toggle
  validationMessage:String = ""; //form validation message

  constructor(private _httpService: HttpService, private _route:ActivatedRoute, private _router:Router){}  

  ngOnInit() {
    this.product = {
      title: "",
      price: "",
      img_url: ""
    }
  }

  createProduct(){
    this._httpService.createOneProduct(this.product).subscribe(data => {
      console.log("This is the data: ",data);
      if(data['data']) {
        this._router.navigate(['/product_list']);
      } else {
      this.validationError = true;
      this.validationMessage =  data['error']['message'];
      } 
    })
  }

}
