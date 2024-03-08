import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prouduct } from 'src/app/shared/interfaces/prouduct';
import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-specificbrand',
  templateUrl: './specificbrand.component.html',
  styleUrls: ['./specificbrand.component.css'],
})
export class SpecificbrandComponent implements OnInit {
  constructor(
    private _EcomDataService: EcomDataService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _CartRequestsService: CartRequestsService
  ) {}

  brandId: string = '';
  specificProducts: Prouduct[] = [];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (brand) => {
        this.brandId = brand.get('id')!;
        if (this.brandId != null) {
          this._EcomDataService.getAllProuductsOfBrand(this.brandId).subscribe({
            next: (response) => {
              this.specificProducts = response.data;
            },
          });
        }
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
      error: (error) => {
        // console.log(error, 'addToCart error');
      },
    });
  }
}
