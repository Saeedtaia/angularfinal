import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Prouduct } from 'src/app/shared/interfaces/prouduct';
import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _EcomDataService: EcomDataService,
    private _ToastrService: ToastrService,
    private _CartRequestsService: CartRequestsService,
    private _NgxPaginationModule: NgxPaginationModule
  ) {}

  prouductData: Prouduct[] = [];
  pageSize: number = 0;
  total: number = 0;
  curruntpage: number = 1;
  ngOnInit(): void {
    this._EcomDataService.getAllProuducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.prouductData = response.data;
        this.pageSize = response.metadata.limit;
        this.total = response.results;
        this.curruntpage = response.metadata.currentPage;
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

  pageChanged(event: any): void {
    console.log(event, 'pagenation event');
    this._EcomDataService.getAllProuducts(event).subscribe({
      next: (response) => {
        console.log(response.data);
        this.prouductData = response.data;
        this.pageSize = response.metadata.limit;
        this.total = response.results;
        this.curruntpage = response.metadata.currentPage;
      },
    });
  }
}
