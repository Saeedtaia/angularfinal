import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.css'],
})
export class PaymentDataComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _CartRequestsService: CartRequestsService
  ) {}

  cartId: string = '';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id')!;
      },
    });
  }

  paymentForm: FormGroup = this._FormBuilder.group({
    details: [''],
    city: [''],
    phone: [''],
  });

  paymentSubmit(): void {
    this._CartRequestsService
      .checkOut(this.cartId, this.paymentForm.value)
      .subscribe({
        next: (respons) => {
          window.open(respons.session.url, '_self');
        },
      });
  }
}
