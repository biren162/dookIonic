import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ManageShopPage } from "../pages/manage-shop/manage-shop";
import { AddProductPage } from "../pages/add-product/add-product";
import { MyShopPage } from "../pages/my-shop/my-shop";
import { LoginPage } from "../pages/login/login";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { AddShopPage } from "../pages/add-shop/add-shop";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  loading: any;
  rootPage: any = LoginPage;

  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public authService: AuthServiceProvider,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    //this.pages = [{ title: "Home", component: MyTeamsPage }];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goToManageShop() {
    this.nav.push(ManageShopPage);
  }
  goToAddProduct() {
    this.nav.push(AddProductPage);
  }
  goToShop() {
    this.nav.push(MyShopPage);
  }
  goToAddShop() {
    this.nav.push(AddShopPage);
  }
  logout() {
    console.log("logout called");
    this.authService.logout(localStorage.getItem("token")).subscribe(
      result => {
        //  this.loading.dismiss();
        //  let nav = this.app.getRootNav();
        localStorage.removeItem("token");
        this.nav.setRoot(LoginPage);
      },
      err => {
        // this.loading.dismiss();
        this.presentToast(err);
      }
    );
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
