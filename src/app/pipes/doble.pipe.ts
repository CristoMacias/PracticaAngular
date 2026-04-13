import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doble',
  standalone: true
})
export class DoblePipe implements PipeTransform {

  transform(numero: number): number {
    return numero * 2;
  }

}
