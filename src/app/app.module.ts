import { MyhttpInterceptor } from './shared/interceptors/myhttp.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { DetailsComponent } from './components/details/details.component';
import { CatigoriesComponent } from './components/catigories/catigories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './components/products/products.component';
import { TextSlicePipe } from './shared/pips/text-slice.pipe';
import { SearchPipe } from './shared/pips/search.pipe';
import { PaymentDataComponent } from './components/payment-data/payment-data.component';
import { GoupbtnComponent } from './components/goupbtn/goupbtn.component';
import { BrandsearchPipe } from './shared/pips/brandsearch.pipe';
import { SearchbrandPipe } from './shared/pips/searchbrand.pipe';
import { SpecificbrandComponent } from './components/specificbrand/specificbrand.component';
import { SpecificcategoryComponent } from './components/specificcategory/specificcategory.component';
import { SearchcategoryPipe } from './shared/pips/searchcategory.pipe';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { UpdatepassComponent } from './components/updatepass/updatepass.component';
import { UpdateuserdataComponent } from './components/updateuserdata/updateuserdata.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    BrandsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    FooterComponent,
    NotFoundComponent,
    AllordersComponent,
    DetailsComponent,
    CatigoriesComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    ProductsComponent,
    TextSlicePipe,
    SearchPipe,
    PaymentDataComponent,
    GoupbtnComponent,
    BrandsearchPipe,
    SearchbrandPipe,
    SpecificbrandComponent,
    SpecificcategoryComponent,
    SearchcategoryPipe,
    WishlistComponent,
    UpdatepassComponent,
    UpdateuserdataComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
