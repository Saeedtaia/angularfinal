import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Prouduct } from 'src/app/shared/interfaces/prouduct';
import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _EcomDataService: EcomDataService,
    private _ToastrService: ToastrService,
    private _CartRequestsService: CartRequestsService,
    private _WishlistService: WishlistService
  ) {}

  prouductData: Prouduct[] = [];
  categories: any;
  searchterm: string = '';
  ids: string[] = [];
  ngOnInit(): void {
    this._EcomDataService.getAllProuducts().subscribe({
      next: (response) => {
        this.prouductData = response.data;
      },
    });

    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        for (let i = 0; i < response.data.length; ++i) {
          this.ids.push(response.data[i]._id);
        }
      },
    });

    this._EcomDataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.log(err, 'homecategories error');
      },
    });
  }

  addToCart(id: string): void {
    this._CartRequestsService.addToCart(id).subscribe({
      next: (response) => {
        this._CartRequestsService.numberOfitems.next(response.numOfCartItems);
        this._CartRequestsService.cartData.next(response.data.products);

        this._ToastrService.success(`${response.message}`);
      },
      error: (error) => {},
    });
  }

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    items: 1,
    navText: ['', ''],
    nav: true,
  };

  addToWishlist(id: string): void {
    let search = this.ids.filter((item) =>
      item.toLocaleLowerCase().includes(id.toLocaleLowerCase())
    );
    console.log(search[0]);
    if (search[0] === id) {
      this._ToastrService.info(`This Item IS already Added to List`);
    } else {
      this._WishlistService.addProductToWishlist(id).subscribe({
        next: (result) => {
          // console.log(result);
          for (let i = 0; i < result.data.length; ++i) {
            this.ids.push(result.data[i]);
          }
          this._ToastrService.success(`${result.message} `);
        },
      });
    }
  }
}
