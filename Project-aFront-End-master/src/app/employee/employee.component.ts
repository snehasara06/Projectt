import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../service/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = []
  visible!: boolean;
  selectedEmployee!:String
  constructor(private router:Router,protected employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.employeeList();
    
  }

  logout() { 
    this.router.navigate(['login'])
  }

  editEmployee(emp: Employee) {
     this.employeeService.getEmployeeById(emp._id).subscribe((data) => {
   // console.log(data)
    this.employeeService.selectedEmployee=data;
    this.selectedEmployee=this.employeeService.employeeToEdit()
    
    this.router.navigate(['edit-employees/'+this.selectedEmployee])
    })
    
  }

  deleteEmployee(emp: Employee) {
    if (window.confirm("This Employee details will be deleted and cannot be reterived . Are you sure to delete this?")) {
      this.employeeService.deleteEmployee1(emp._id).subscribe((data) => {
        this.employeeList();
      })
    }
    else {
      this.employeeList();
    }
  }
  

  employeeList() {
    this.employeeService.getEmployee().subscribe((data) => {
      //console.log(data)
      this.employeeService.employees = data;
      if (data != 0) {
        this.visible = false;
      }
      else {
        this.visible = true;
      }
    })
  }

}
