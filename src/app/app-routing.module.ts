import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UpdatepassComponent } from './components/updatepass/updatepass.component';
import { SpecificcategoryComponent } from './components/specificcategory/specificcategory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CatigoriesComponent } from './components/catigories/catigories.component';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { autherizationGuard } from './shared/guards/autherization.guard';
import { ProductsComponent } from './components/products/products.component';
import { PaymentDataComponent } from './components/payment-data/payment-data.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { SpecificbrandComponent } from './components/specificbrand/specificbrand.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UpdateuserdataComponent } from './components/updateuserdata/updateuserdata.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [autherizationGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'categories', component: CatigoriesComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'allorders', component: AllordersComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'favProducts', component: WishlistComponent },
      { path: 'paymentdata/:id', component: PaymentDataComponent },
      { path: 'specificbrand/:id', component: SpecificbrandComponent },
      { path: 'specificcategory/:id', component: SpecificcategoryComponent },
      { path: 'updatePassword', component: UpdatepassComponent },
      { path: 'updateYourData', component: UpdateuserdataComponent },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'ForgetPassword', component: ForgetPasswordComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
