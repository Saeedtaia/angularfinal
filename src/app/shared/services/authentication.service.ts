import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  rigester(registerdata: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      registerdata
    );
  }

  login(loginData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      loginData
    );
  }

  userTokenData: any;
  getUserTokenDecode(): void {
    if (localStorage.getItem('userToken') != null) {
      let userToken = JSON.parse(localStorage.getItem('userToken')!);
      let tokenDecoded = jwtDecode(userToken);
      this.userTokenData = tokenDecoded;
      // console.log(tokenDecoded);
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this._ToastrService.success('LogOut Success');
  }

  forgetPassword(Email: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,

      Email
    );
  }

  verifyResetcode(code: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      code
    );
  }

  updatePassword(form: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      form
    );
  }
  updateUserData(form: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      form
    );
  }

  resetPassword(form: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      form
    );
  }
}
