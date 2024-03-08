import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSlice',
})
export class TextSlicePipe implements PipeTransform {
  transform(term: string, start: number, end: number): string {
    return term.split(' ').slice(start, end).join(' ');
  }
}
