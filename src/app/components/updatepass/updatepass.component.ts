import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-updatepass',
  templateUrl: './updatepass.component.html',
  styleUrls: ['./updatepass.component.css'],
})
export class UpdatepassComponent {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  upadatePassword: FormGroup = this._FormBuilder.group(
    {
      currentPassword: [
        '',
        [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)],
      ],
      rePassword: [''],
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

  submitForm(): void {
    if (this.upadatePassword.valid) {
      this._AuthenticationService
        .updatePassword(this.upadatePassword.value)
        .subscribe({
          next: (respons) => {
            console.log(respons);
            localStorage.setItem('token', JSON.stringify(respons.token));
            this._Router.navigate(['/login']);
            this._ToastrService.info(
              `Hay ${respons.user.name} Password had been updated`
            );
          },
          error: (err) => {
            console.log(err);
            this._ToastrService.error(`${err.error.message}`);
            if (
              err.error.message ===
              'User recently changed password! Please login again.'
            ) {
              this._Router.navigate(['/login']);
            }
          },
        });
    }
  }
}
