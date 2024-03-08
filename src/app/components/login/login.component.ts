import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _router: Router,
    private _ToastrService: ToastrService,
    private _FormBuilder: FormBuilder
  ) {}

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)],
    ],
  });

  spinner: boolean = false;
  messageError: string = '';
  submitForm(): void {
    this.spinner = true;

    if (this.loginForm.valid) {
      this._AuthenticationService.login(this.loginForm.value).subscribe({
        next: (respons) => {
          console.log(respons, 'login success');
          if (respons.message === 'success') {
            this.spinner = false;
            localStorage.setItem('token', JSON.stringify(respons.token));
            this._AuthenticationService.getUserTokenDecode();
            this._router.navigate(['/home']);
            this._ToastrService.success('login success');
          }
        },
        error: (err) => {
          this.spinner = false;
          this._ToastrService.error(err.statusMsg);
        },
      });
    }
  }

  passwordType: string = 'password';
  changeEye(event: any): void {
    if (event.target.classList.contains('fa-eye')) {
      event.target.classList.remove('fa-eye');
      event.target.classList.add('fa-eye-slash');
      this.passwordType = 'password';
    } else {
      event.target.classList.remove('fa-eye-slash');
      event.target.classList.add('fa-eye');
      this.passwordType = 'text';
    }
  }
}
