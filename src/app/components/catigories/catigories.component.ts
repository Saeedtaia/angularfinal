import { Component, OnInit } from '@angular/core';
import { brand } from 'src/app/shared/interfaces/brands';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-catigories',
  templateUrl: './catigories.component.html',
  styleUrls: ['./catigories.component.css'],
})
export class CatigoriesComponent implements OnInit {
  constructor(private _EcomDataService: EcomDataService) {}

  categories: brand[] = [];
  searchterm: string = '';
  ngOnInit(): void {
    this._EcomDataService.getCategories().subscribe({
      next: (respons) => {
        this.categories = respons.data;
      },
    });
  }
}
