import { Http, Headers, RequestOptions, RequestMethod } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {
  private apiUrl;
  constructor(
    public http: Http,
    //public http: HttpClient,
    public toastCtrl: ToastController
  ) {
    console.log("Hello ShopServiceProvider Provider");
    this.apiUrl = "http://10.13.10.51:8080/";
  }
  saveProduct(product): Observable<any> {
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    });
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    //console.log("calling api with param:" + imgUri64);
    return this.http
      .post(`${this.apiUrl}addProductApiPost`, product, options)
      .map(response => {
        return response.json();
      });
  }
  getFormData(sessionId): Observable<any> {
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    });
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.http
      .post(`${this.apiUrl}addProductApiGet`, sessionId, options)
      .map(response => {
        console.log("category returned:" + response.json());
        return response.json();
      });
  }
}
