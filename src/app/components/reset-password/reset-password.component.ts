import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _router: Router,
    private _ToastrService: ToastrService,
    private _FormBuilder: FormBuilder
  ) {}

  changeForgetenData: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)],
    ],
  });

  spinner: boolean = false;
  messageError: string = '';
  submitForm(): void {
    this.spinner = true;
    // console.log(this.changeForgetenData);

    if (this.changeForgetenData.valid) {
      this._AuthenticationService
        .resetPassword(this.changeForgetenData.value)
        .subscribe({
          next: (respons) => {
            console.log(respons, 'login success');
            if (respons.token) {
              this.spinner = false;
              localStorage.setItem('token', JSON.stringify(respons.token));
              this._AuthenticationService.getUserTokenDecode();
              this._router.navigate(['/home']);
              this._ToastrService.success('login success');
            }
          },
          error: (err) => {
            this._router.navigate(['/ForgetPassword']);
            this.spinner = false;
          },
        });
    }
  }
}
