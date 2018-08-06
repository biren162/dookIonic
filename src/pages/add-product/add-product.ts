import { Component } from "@angular/core";
import {
  IonicPage,
  LoadingController,
  NavParams,
  ToastController,
  NavController
} from "ionic-angular";
import { ProductServiceProvider } from "../../providers/product-service/product-service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AddShopPage } from "../add-shop/add-shop";
@IonicPage()
@Component({
  selector: "page-add-product",
  templateUrl: "add-product.html"
})
export class AddProductPage {
  loading: any;
  url: String;
  product = {
    itemName: "",
    itemCat: " ",
    itemPrice: "",
    sessionId: "",
    shopLink: "",
    urlList: []
  };
  categoryList: any;
  shopList: any;
  shopPresent: String;
  errorMap = {
    itemCat_error: "",
    itemName_error: ""
  };
  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public navParams: NavParams,
    public productService: ProductServiceProvider,
    //  public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddProductPage");
    this.product.sessionId = localStorage.getItem("token");
    this.productService.getFormData(this.product.sessionId).subscribe(
      result => {
        if (result == "" || result == null) {
          this.presentToast("something went wrong!");
          console.log("error in fetching pre-form data");
        }
        console.log(JSON.stringify(result));
        this.shopPresent = result.shopPresent;
        this.categoryList = JSON.parse(result.categoryList);
        this.shopList = JSON.parse(result.shopList);
        this.product.shopLink = result.shopLink;
      },
      err => {}
    );
    if (this.shopPresent == "no") {
      this.navCtrl.push(AddShopPage);
    }
  }
  changeCat() {
    if (this.product.itemCat == "addNew") {
      console.log("**" + this.product.itemCat);
      this.product.itemCat = "";
    }
  }
  saveProduct() {
    this.productService.saveProduct(this.product).subscribe(
      result => {
        console.log("inside result:");
        if (result == "success") {
          this.navCtrl.popToRoot();
        } else if (result == "error") {
          this.presentToast("error in saving details");
        } else {
          this.errorMap = result;
        }
      },
      err => {
        console.log("inside err");
        //  this.loading.dismiss();
        this.presentToast(err);
      }
    );
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: "Uploading..."
    });
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
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      imageData => {
        //  this.image64 = "data:image/jpeg;base64," + imageData;
        this.url = imageData;
      },
      err => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }
  Save() {}
}
