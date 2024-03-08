import { Pipe, PipeTransform } from '@angular/core';
import { Prouduct } from '../interfaces/prouduct';

@Pipe({
  name: 'searchcategory',
})
export class SearchcategoryPipe implements PipeTransform {
  transform(data: Prouduct[], term: string): Prouduct[] {
    return data.filter((item) =>
      item.category._id.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
  }
}
