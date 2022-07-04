import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../service/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers:[EmployeeService]
})
export class SignUpComponent implements OnInit {
  constructor(private router: Router,protected employeeService:EmployeeService) { }
  ngOnInit(): void {
  }

  visible: boolean=false;
  employees!: Employee;

  checkPass(e:Event){
    if (this.employeeService.password == this.employeeService.confirmPass) {
      this.visible = false;
    }
    else {
      this.visible = true;
    }
  }

  cancel() {
    this.router.navigate(['login'])
  }
  register(form:NgForm) {
    this.employeeService.postEmployee(form.value).subscribe((data: any) => {
      console.log(data.token);
      localStorage.setItem('token',data.token)
      this.router.navigate(['login'])
    })

  }

}
