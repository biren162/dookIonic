import { Http, Headers, RequestOptions, RequestMethod } from "@angular/http";
//import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private apiUrl;

  private loginStatus;
  constructor(public http: Http) {
    console.log("Hello AuthServiceProvider Provider");
    this.apiUrl = "http://10.13.92.255:8080/";
  }
  /*login2(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.apiUrl+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }*/
  login(credentials): Observable<any> {
    // let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    // let body=this.serializeObj(credentials);
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    });

    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    console.log(credentials);
    return this.http
      .post(`${this.apiUrl}ownerLoginApi`, credentials, options)
      .map(response => {
        this.loginStatus = response.json();
        return this.loginStatus;
      });
  }
  register(owner): Observable<any> {
    // let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //  let body=this.serializeObj(owner);
    console.log("inside service provider.");
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    });
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });

    return this.http
      .post(`${this.apiUrl}ownerSignupApi`, owner, options)
      .map(response => {
        console.log("returning object");
        return response.json();
      });
  }
  logout(token) {
    console.log("sessoin Id:" + token);
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    });
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.http
      .post(`${this.apiUrl}logoutApi`, token, options)
      .map(Response => {
        return Response;
      });
  }
  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(
        encodeURIComponent(property) + "=" + encodeURIComponent(obj[property])
      );

    return result.join("&");
  }
}
