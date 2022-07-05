import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private employeeService: EmployeeService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let reqToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.employeeService.getToken()
      }
    })
    return next.handle(reqToken).pipe(
      catchError((error) => {
        //console.log(error.error)
        alert(error.message)
        return throwError(error)
      }))
  }
}
