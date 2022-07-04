import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, protected employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.employeeService.login(form.value).subscribe((data: any) => {

      this.employeeService.loginRole = data.user.role
      if (this.employeeService.loginRole == "Manager") {
        localStorage.setItem('role', data.user.role)
      }

      localStorage.setItem('token', data.token)
      //console.log(data.token)
      form.reset()
      this.router.navigate(['/home'])
    }, (error) => {

    })
  }

  signUp() {
    this.router.navigate(['/sign-up'])
  }

}
