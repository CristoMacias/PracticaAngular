import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  let authReq = req;
  if (req.url.includes('/admin')){
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken() || ''}`,
        "X-Admin-Request": "true"
      }
    });
  }
  else{
    console.log("NO ES ADMIN")
    console.log('Token obtenido:', authService.getToken());
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken() || ''}`
      }
    });
  }
  
  console.log('Petición original:', req);
  console.log('Petición con token:', authReq);
  console.log('Authorization header:', authReq.headers.get('Authorization'));

  return next(authReq).pipe(
    tap({
      next: (event) => {
        console.log('Respuesta:', event);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  );
};