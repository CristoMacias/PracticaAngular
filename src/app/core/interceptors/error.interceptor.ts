import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

const router = inject(Router);

  return next(req).pipe(tap({
    next: (event) => {
    },
    error: (error) =>{
      console.error("Error detectado: ", error);

      switch (error.status){

        case 400:
          console.error("Error 400: Bad Request");
          break;
        case 401:
          console.error("Error 401: Unauthorized");
          router.navigate(['/login']);
          break;
        case 403:
          console.error("Error 403: Forbidden");
          break;
        case 404:
          console.error("Error 404: Not Found");
          break;
        case 500:
          console.error("Error 500: Internal Server Error");
          break;
        default:
          console.error(`Error ${error.status}: ${error.message}`);
      }
    }
  }));
};
