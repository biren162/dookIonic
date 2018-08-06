//import { HttpClient } from "@angular/common/http";
import { Http, Headers, RequestOptions, RequestMethod } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
//import { FileTransfer, FileUploadOptions } from "@ionic-native/file-transfer";
/*
  Generated class for the ShopServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopServiceProvider {
  private apiUrl;
  private imageURI;
  private uploadedImgUrl;
  constructor(
    public http: Http,
    //public http: HttpClient,
    public toastCtrl: ToastController
  ) {
    console.log("Hello ShopServiceProvider Provider");
    this.apiUrl = "http://10.13.10.51:8080/";
  }
  /* saveImg(imgUri) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "ionicfile",
      fileName: "ionicfile",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    };
    console.log("local url:" + imgUri);
    fileTransfer.upload(imgUri, "${this.apiUrl}uploadImgApi", options).then(
      data => {
        console.log(data + " url of uploaded img");
        this.uploadedImgUrl = data;
     
        this.imageURI = data;
      },
      err => {
        console.log(err);
     
        this.imageURI = "-1";
      }
    );
    return this.imageURI;
  }*/
  saveShop(shop): Observable<any> {
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    });
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    //console.log("calling api with param:" + imgUri64);
    return this.http
      .post(`${this.apiUrl}addShopApi`, shop, options)
      .map(response => {
        return response.json();
      });
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}ShopCategoriesApi`).map(response => {
      console.log("category returned:" + response.json());
      return response.json();
    });
  }
}
