import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad',
  standalone: true
})
export class EdadPipe implements PipeTransform {

  transform(fechaNacimiento: Date): number {
    const fechaActual = new Date();
    
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    return edad;
  }

}
