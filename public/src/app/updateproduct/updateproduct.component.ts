import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  parameterID:any;

  productQuery:any;
  productObj:any;

  validationError:Boolean = false; //form validation toggle
  validationMessage:String = ""; //form validation message



  constructor(private _http:HttpService, private _route:ActivatedRoute, private _router:Router){}  

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
    this.parameterID = params['id'];
    });
    this.getProduct();
    this.productObj = {
      title: "",
      price: "",
      img_url: "",
      _id: this.parameterID
    }


  }

  getProduct(){
    this._http.getOneProduct(this.parameterID).subscribe( data =>{
      console.log(data);
      this.productQuery = data['data'];
    })
  }

  updateProduct(){
    if(this.productObj.title.length < 4){
        this.validationError = true;
        this.validationMessage =  "Title must be at least 4 characters";
    } else {
    this._http.updateOneProduct(this.productObj).subscribe( data =>{
      console.log(data);
      this._router.navigate(['/product_list']);
      })
    }
  }


  

}