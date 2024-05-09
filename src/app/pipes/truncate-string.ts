import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit = 50,
    completeWords = false,
    ellipsis = '...'
  ) {
    let lastindex = limit;

    if (completeWords) {
      lastindex = value.substring(0, limit).lastIndexOf(' ');
    }

    return `${value.substring(0, lastindex)}${ellipsis}`;
  }
}
