import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthenticationService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {}
  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)],
      ],
      rePassword: [''],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (rePassword?.value == '') {
      rePassword.setErrors({ required: true });
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ passwordMatch: true });
    }
  }

  messageError?: string;
  spinnerLoading: boolean = false;
  handleform(): void {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.spinnerLoading = true;
      this._AuthService.rigester(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            this._Router.navigate(['/login']);
            this._ToastrService.success(`Register Successful`);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerLoading = false;
          console.log(err);
          // this.messageError = err.error.message;
          this._ToastrService.error(`${err.error.message}`);
        },
      });
    } //sending object for back end
  }

  // constructor(
  //   private _AuthenticationService: AuthenticationService,
  //   private _FormBuilder: FormBuilder,
  //   private _ToastrService: ToastrService,
  //   private _Router: Router
  // ) {}

  // registerForm: FormGroup = this._FormBuilder.group(
  //   {
  //     name: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(20),
  //       ],
  //     ],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: [
  //       '',
  //       [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)],
  //     ],
  //     rePassword: [''],
  //     // RxwebValidators.compare({ fieldName: 'password' })
  //     phone: [
  //       '',
  //       [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
  //     ],
  //   },
  //   { validators: [this.matchPassword] } as FormControlOptions
  // );

  // matchPassword(group: FormGroup): void {
  //   const password = group.get('password');
  //   const rePassword = group.get('rePassword');

  //   if (rePassword?.value == '') {
  //     rePassword.setErrors({ requireed: true });
  //   } else if (password?.value !== rePassword?.value) {
  //     rePassword?.setErrors({ match: true });
  //   }
  // }

  // messageError: boolean = false;
  // spinner: boolean = false;
  // submitForm(): void {
  //   console.log(this.registerForm);
  //   if (this.registerForm.valid) {
  //     this.spinner = true;
  //     this._AuthenticationService.rigester(this.registerForm.value).subscribe({
  //       next: (respons) => {
  //         console.log(respons);
  //         if (respons.message === 'success') {
  //           this._ToastrService.success('Registration successful');
  //           this._Router.navigate(['/login']);
  //         }
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.log(err);
  //         this.spinner = false;
  //       },
  //     });
  //   }
  // }
}
