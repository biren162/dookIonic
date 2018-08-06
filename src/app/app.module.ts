import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";

import { SplashScreen } from "@ionic-native/splash-screen";
import { HttpModule } from "@angular/http";
import { AddProductPage } from "../pages/add-product/add-product";
import { ManageShopPage } from "../pages/manage-shop/manage-shop";
import { MyShopPage } from "../pages/my-shop/my-shop";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { LoginPage } from "../pages/login/login";
import { HttpClientModule } from "@angular/common/http";
import { RegisterOwnerPage } from "../pages/register-owner/register-owner";
import { ShopServiceProvider } from "../providers/shop-service/shop-service";
import { AddShopPage } from "../pages/add-shop/add-shop";
import { Camera } from "@ionic-native/camera";
/*import {
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";*/
import { Geolocation } from "@ionic-native/geolocation";
import { ProductServiceProvider } from "../providers/product-service/product-service";

@NgModule({
  declarations: [
    MyApp,
    AddProductPage,
    ManageShopPage,
    MyShopPage,
    LoginPage,
    RegisterOwnerPage,
    AddShopPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  exports: [LoginPage],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddProductPage,
    ManageShopPage,
    MyShopPage,
    LoginPage,
    RegisterOwnerPage,
    AddShopPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    ShopServiceProvider,
    Camera,
    Geolocation,
    ProductServiceProvider
  ]
})
export class AppModule {}
