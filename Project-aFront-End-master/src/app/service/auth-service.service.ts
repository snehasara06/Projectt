import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  readonly baseURL = "http://localhost:9000/login/";

  constructor(private http:HttpClient) { }

  login(data: Login){
    console.log(data)
    return this.http.post(this.baseURL,data);
  }

  
}
