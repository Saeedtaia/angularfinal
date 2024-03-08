import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Prouduct } from 'src/app/shared/interfaces/prouduct';
import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _CartRequestsService: CartRequestsService
  ) {}

  list: Prouduct[] = [];
  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (result) => {
        // console.log(result);
        this.list = result.data;
      },
    });
  }

  addToCart(id: string): void {
    this._CartRequestsService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(`${response.message}`);
      },
      error: (error) => {
        // console.log(error, 'addToCart error');
      },
    });
  }

  deletFromWishlist(id: string): void {
    this._WishlistService.deleteProductToWishlist(id).subscribe({
      next: (result) => {
        // console.log(result);
        // this.list = result.data;
        this._ToastrService.success(`${result.message}`);
        this._WishlistService.getWishlist().subscribe({
          next: (result) => {
            // console.log(result);
            this.list = result.data;
          },
        });
      },
    });
  }
}
