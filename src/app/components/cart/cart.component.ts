import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';
import { Component, OnInit } from '@angular/core';
import { cartData } from 'src/app/shared/interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _CartRequestsService: CartRequestsService) {}

  cartData!: cartData;
  ngOnInit(): void {
    this._CartRequestsService.getUserCart().subscribe({
      next: (data) => {
        this.cartData = data.data;
      },
      error: (err) => {
        console.log(err, 'Error cart');
      },
    });
  }

  deleteItemCart(id: string): void {
    this._CartRequestsService.removeItem(id).subscribe({
      next: (Response) => {
        this.cartData = Response.data;
        this._CartRequestsService.numberOfitems.next(Response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this.data = this.cartData;
      },
    });
  }

  data: object = {
    status: 'success',
    numOfCartItems: 0,
    data: {
      _id: '65e51911be8b523235df419a',
      cartOwner: '65ccc93e6e4d6902e9c9ed4a',
      products: [],
      createdAt: '2024-03-04T00:42:57.508Z',
      updatedAt: '2024-03-04T00:44:11.330Z',
      __v: 0,
      totalCartPrice: 0,
    },
  };

  changeCount(id: string, count: number): void {
    clearTimeout(this.cartTimeOut);

    this.cartTimeOut = setTimeout(() => {
      if (count > 0) {
        this._CartRequestsService.updateitem(id, count).subscribe({
          next: (respons) => {
            this.cartData = respons.data;
            this._CartRequestsService.numberOfitems.next(
              respons.numOfCartItems
            );
          },
        });
      }
    }, 1000);
  }

  cartTimeOut: any;
}
