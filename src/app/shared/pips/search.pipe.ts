import { Pipe, PipeTransform } from '@angular/core';
import { Prouduct } from '../interfaces/prouduct';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(data: Prouduct[], term: string): Prouduct[] {
    return data.filter((item) =>
      item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
  }
}
