import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductService } from './Services/product.service';
import { CartService } from './Services/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './Services/Order.service';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RegisterComponent } from './register/register.component';
import { InventoryService } from './Services_Admin/inventory.services';
import { LoginService } from './Services/login.services';
import { ProductComponent } from './inventory/product/product.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    LoginComponent,
    InventoryComponent,
    ProductComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HeaderAdminComponent,
    FooterAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [ProductService, CartService, OrderService, InventoryService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
