import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'saludo',
  standalone: true,
  pure: false
})
export class SaludoPipe implements PipeTransform {

  private translate = inject(TranslateService);

  transform(nombre: string): string {
    return this.translate.instant('SALUDO', { usuario: nombre });
  }

}
