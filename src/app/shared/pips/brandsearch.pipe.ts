import { Pipe, PipeTransform } from '@angular/core';
import { brand } from '../interfaces/brands';

@Pipe({
  name: 'brandsearch',
})
export class BrandsearchPipe implements PipeTransform {
  transform(data: brand[], term: string): brand[] {
    return data.filter((item) =>
      item.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
  }
}
