import { Pipe, PipeTransform } from '@angular/core';
import { Prouduct } from '../interfaces/prouduct';

@Pipe({
  name: 'searchbrand',
})
export class SearchbrandPipe implements PipeTransform {
  transform(data: Prouduct[], term: string): Prouduct[] {
    return data.filter((item) =>
      item.brand._id.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
  }
}
