import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  
  createOneProduct (data){
    return this._http.post('/product', data)
  }

  getAllProducts (){
    return this._http.get('/products')
  }

  deleteSingleProduct(id) {
    return this._http.delete('/product/'+id)
  }

  getOneProduct(id){
    return this._http.get('/product/'+id)
  }
  updateOneProduct(data){
    return this._http.put('/product', data);
  }

}
