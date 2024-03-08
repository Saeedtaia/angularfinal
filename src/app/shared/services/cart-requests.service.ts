import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartRequestsService {
  constructor(private _HttpClient: HttpClient) {}

  headers: any = {
    token: JSON.parse(localStorage.getItem('userToken')!),
  };
  numberOfitems: BehaviorSubject<number> = new BehaviorSubject(0);
  cartData: BehaviorSubject<any> = new BehaviorSubject([]);
  addToCart(prouductId: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        // body
        productId: prouductId,
      }
      // {
      //   headers: this.headers,
      // }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/cart`

      // {
      //   headers: this.headers,
      // }
    );
  }

  removeItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
      // {
      //   headers: this.headers,
      // }
    );
  }

  updateitem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      }
      // {
      //   headers: this.headers,
      // }
    );
  }

  checkOut(id: string, data: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://saeedtaia.github.io/angularfinal`,
      {
        shippingAddress: data,
      }
      // {
      //   headers: this.headers,
      // }
    );
  }
}
