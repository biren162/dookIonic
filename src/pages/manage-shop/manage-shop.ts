import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginPage } from "../login/login";

/**
 * Generated class for the ManageShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-manage-shop",
  templateUrl: "manage-shop.html"
})
export class ManageShopPage {
  //private token;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ManageShopPage");
  }
}
