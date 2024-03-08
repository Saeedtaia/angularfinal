import { Component, OnInit } from '@angular/core';
import { brand } from 'src/app/shared/interfaces/brands';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(private _EcomDataService: EcomDataService) {}

  allbrands: brand[] = [];
  searchterm: string = '';
  ngOnInit(): void {
    this._EcomDataService.getAllBrands().subscribe({
      next: (response) => {
        this.allbrands = response.data;
      },
    });
  }
}
