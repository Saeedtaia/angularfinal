import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-updateuserdata',
  templateUrl: './updateuserdata.component.html',
  styleUrls: ['./updateuserdata.component.css'],
})
export class UpdateuserdataComponent {
  constructor(
    private _AuthService: AuthenticationService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {}

  updateUserData: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });

  messageError?: string;
  spinnerLoading: boolean = false;
  handleform(): void {
    // console.log(this.updateUserData);
    if (this.updateUserData.valid) {
      this.spinnerLoading = true;
      this._AuthService.updateUserData(this.updateUserData.value).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.message === 'success') {
            this._ToastrService.success(`Register Successful`);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerLoading = false;
          // console.log(err);
          // this.messageError = err.error.message;
          this._ToastrService.error(`${err.error.msg}`);
        },
      });
    } //sending object for back end
  }
}
