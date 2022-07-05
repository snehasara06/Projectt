import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Login } from './login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private router: Router) { }
  _id!: Employee;
  first_name!: Employee;
  last_name!: Employee;
  employeeId!: Employee;
  emailId!: Employee;
  department!: Employee;
  role!: Employee;
  password!: Employee;
  confirmPass!: Employee;
  __v!: number;

  employees!: Employee[]
  selectedEmployee!: Employee;
  loginRole!: String;

  readonly baseURL = "http://localhost:9000/employee/";

  employeeToEdit() {
    return this.selectedEmployee._id;
  }
  getEmployee() {
    return this.http.get<any>(this.baseURL)
  }
  getEmployeeById(_id: String) {
    return this.http.get<any>(this.baseURL + `${_id}`)
  }

  postEmployee(employee: Employee) {
    //console.log(employee)
    return this.http.post(this.baseURL + 'sign-up', employee)
  }

  putEmployee(emp: Employee) {
    console.log(emp)
    return this.http.put(this.baseURL + 'update/' + `${emp._id}`, emp, { responseType: 'text' });
  }

  deleteEmployee1(_id: String) {
    return this.http.delete(this.baseURL + 'delete/' + `${_id}`, { responseType: 'text' });
  }

  loginManager(): boolean {
    return !!localStorage.getItem('role')
  }

  login(data: Login) {
    //console.log(data)
    return this.http.post(this.baseURL + 'login', data);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigate(['login'])
  }

}
