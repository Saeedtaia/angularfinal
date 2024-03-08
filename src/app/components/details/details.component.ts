import { WishlistService } from './../../shared/services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { DetailsProuduct } from 'src/app/shared/interfaces/prouduct';
import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _EcomDataService: EcomDataService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _CartRequestsService: CartRequestsService,
    private _WishlistService: WishlistService
  ) {}

  productId: string = '';
  ids: string[] = [];
  detailsData!: DetailsProuduct;
  images!: string[];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id')!;
        this._EcomDataService.getProuductDetails(params.get('id')!).subscribe({
          next: (response) => {
            this.detailsData = response.data;
            this.images = response.data.images;
          },
        });
      },
    });

    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        for (let i = 0; i < response.data.length; ++i) {
          this.ids.push(response.data[i]._id);
        }
      },
    });
  }

  addToWishlist(): void {
    let search = this.ids.filter((item) =>
      item.toLocaleLowerCase().includes(this.productId.toLocaleLowerCase())
    );
    console.log(search[0]);
    if (search[0] === this.productId) {
      this._ToastrService.info(`This Item IS already Added to List`);
    } else {
      this._WishlistService.addProductToWishlist(this.productId).subscribe({
        next: (result) => {
          // console.log(result);
          for (let i = 0; i < result.data.length; ++i) {
            this.ids.push(result.data[i]);
            // console.log(this.ids, 'after adding');
          }
          this._ToastrService.success(`${result.message} `);
        },
      });
    }
  }

  detailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    navSpeed: 500,
    items: 1,
    navText: ['', ''],
    nav: false,
  };

  addToCart(): void {
    this._CartRequestsService.addToCart(this.productId).subscribe({
      next: (response) => {
        this._CartRequestsService.numberOfitems.next(response.numOfCartItems);
        this._CartRequestsService.cartData.next(response.data.products);
        this._ToastrService.success(`${response.message}`);
      },
      error: (err) => {
        console.log(err, 'Erroradding to cart');
      },
    });
  }
}
