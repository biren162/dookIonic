import { Component } from "@angular/core";
import {
  NavController,
  LoadingController,
  IonicPage,
  NavParams,
  ToastController,
  MenuController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ManageShopPage } from "../manage-shop/manage-shop";
import { LoginPage } from "../login/login";
/**
 * Generated class for the RegisterOwnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register-owner",
  templateUrl: "register-owner.html"
})
export class RegisterOwnerPage {
  loading: any;
  owner = {
    userName: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    verifyPw: "",
    mo: ""
  };
  errorMap = {
    email_error: "",
    name_error: "",
    password_error: "",
    verify_error: "",
    mo_error: "",
    fname_error: "",
    lname_error: ""
  };
  data: any;
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  doRegister() {
    console.log("do register called");
    console.log(this.owner);
    this.showLoader();
    this.authService.register(this.owner).subscribe(
      result => {
        this.loading.dismiss();
        this.data = result;
        console.log("inside register api, result:" + result);
        localStorage.setItem("token", this.data.access_token);
        if (result == "success") {
          this.navCtrl.setRoot(ManageShopPage);
        } else {
          this.errorMap = result;
          this.loading.dismiss();
        }
      },
      err => {
        this.loading.dismiss();
        this.presentToast(err);
      }
    );
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: "Authenticating..."
    });

    this.loading.present();
  }
  login() {
    this.navCtrl.push(LoginPage);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom",
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
