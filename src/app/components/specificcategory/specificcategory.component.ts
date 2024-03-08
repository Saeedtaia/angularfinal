import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prouduct } from 'src/app/shared/interfaces/prouduct';
import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-specificcategory',
  templateUrl: './specificcategory.component.html',
  styleUrls: ['./specificcategory.component.css'],
})
export class SpecificcategoryComponent implements OnInit {
  constructor(
    private _EcomDataService: EcomDataService,
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartRequestsService: CartRequestsService
  ) {}

  specificProducts: Prouduct[] = [];
  categoryId: string = '';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id')!;
        if (params.get('id') != null) {
          this._EcomDataService
            .getAllProuductsOfCategory(this.categoryId)
            .subscribe({
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
