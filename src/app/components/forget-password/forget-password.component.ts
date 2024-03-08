import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _router: Router,
    private _ToastrService: ToastrService,
    private _FormBuilder: FormBuilder
  ) {}

  forgetPassword: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  spinner: boolean = false;
  messageError: string = '';
  switchToVirfyCode(): void {
    this.spinner = true;
    console.log(this.forgetPassword);

    if (this.forgetPassword.valid) {
      this._AuthenticationService
        .forgetPassword(this.forgetPassword.value)
        .subscribe({
          next: (respons) => {
            console.log(respons, 'forget success');
            if (respons.statusMsg === 'success') {
              this.spinner = false;
              this._ToastrService.info(respons.message);
              this.virfycode = true;
              this.countUp();
            }
          },
          error: (err) => {
            this.spinner = false;
            console.log(err, 'login error');
            this._ToastrService.error(err.error.statusMsg);
          },
        });
    }
  }

  minutes: number = 10;
  countUp() {
    const countUpInterval = setInterval(() => {
      if (this.minutes <= 10) {
        this.minutes++;
      } else {
        clearInterval(countUpInterval);
      }
    }, 60000);
  }

  code: FormGroup = this._FormBuilder.group({
    resetCode: ['', [Validators.required]],
  });

  virfycode: boolean = false;
  submitCode(): void {
    this._AuthenticationService.verifyResetcode(this.code.value).subscribe({
      next: (respons) => {
        if (respons.status == 'Success') {
          this._ToastrService.success(respons.status);
          this._router.navigate(['/resetPassword']);
        }
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }
}
