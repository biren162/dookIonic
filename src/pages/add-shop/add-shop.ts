import { Component, SystemJsNgModuleLoader } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  IonicPage,
  LoadingController,
  NavParams,
  ToastController,
  NavController
} from "ionic-angular";
import { ShopServiceProvider } from "../../providers/shop-service/shop-service";
import { Camera, CameraOptions } from "@ionic-native/camera";

/**
 * Generated class for the AddShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-add-shop",
  templateUrl: "add-shop.html"
})
export class AddShopPage {
  private image64;
  loading: any;
  url: String;
  shop = {
    shopName: "",
    shopCategory: "",
    ownerName: "",
    url: "",
    lat: "",
    longi: "",
    address: { line1: "", area: "", city: "", state: "", country: "" }
  };
  errorMap = {
    name_error: "",
    line1_error: "",
    area_error: "",
    city_error: "",
    state_error: "",
    country_error: ""
  };
  categoryList: any;
  private imageFileName;
  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public shopService: ShopServiceProvider,
    public navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {}
  ionViewDidLoad() {
    console.log("did load:");
    this.categoryList = this.shopService.getCategories();
    console.log(this.categoryList);
  }
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      imageData => {
        //  this.image64 = "data:image/jpeg;base64," + imageData;
        this.image64 = imageData;
      },
      err => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }
  saveShop() {
    /*this.showLoader();
    this.shopService.saveShop(this.shop).subscribe(
      result => {
        console.log("inside result");
        this.loading.dismiss();
        // this.url = result;
        //  this.imageFileName = this.url;
        if (result == "success") {
          this.navCtrl.setRoot(addpagetoredirect);
        } else {
          this.errorMap = result;
        }
      },
      err => {
        console.log("inside err");
        this.loading.dismiss();
        this.presentToast(err);
      }
    );
    console.log("img url:" + this.url);
    */
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: "Uploading..."
    });

    this.loading.present();
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
