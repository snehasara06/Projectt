import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  _id!:Employee;
  first_name!: Employee;
  last_name!: Employee;
  employeeId!:Employee;
  emailId!:Employee;
  department!: Employee;
  role!: Employee;
  password!: Employee;
  confirmPass!: Employee;
  __v!:number;

  employees!:Employee[]

  readonly baseURL = "http://localhost:9000/employee/";

  postEmployee(employee:Employee){
    //console.log(employee)
    return this.http.post(this.baseURL+'sign-up',employee)
  }
}
