import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductComponent } from './inventory/product/product.component';
import { AuthguardService } from './Services/authGuard.services';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'  },
  
  { path: 'home', component: LandingPageComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthguardService] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthguardService] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthguardService] }, 

  //added by monil
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'inventory',
    children: [{ path: 'product/:id', component: ProductComponent }],
    canActivate: [AuthguardService],
  },



  { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }