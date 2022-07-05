import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  id!: String;
  constructor(private router: Router, private route: ActivatedRoute, protected employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        //console.log(params._id);
        this.id = params._id
      })
  }

  back() {
    this.router.navigate(['home'])
  }

  cancel(form: NgForm) {
    if (window.confirm("The Changes is not saved . Are you sure to leave?")) {
      form.setValue({
        _id: "",
        first_name: "",
        last_name: "",
        employeeId: "",
        emailId: "",
        department: "",
        role: ""
      })
      this.router.navigate(['employees'])
    }

  }

  logout() {
    this.router.navigate(['login'])
  }

  formData(form: NgForm) {
    this.employeeService.getEmployeeById(this.id).subscribe((data) => {
      console.log(data)
      form.setValue({
        _id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        employeeId: data.employeeId,
        emailId: data.emailId,
        department: data.department,
        role: data.role
      })
    })
    return true;
  }

  update(form: NgForm) {
    this.employeeService.putEmployee(form.value).subscribe((data) => {
      console.log(data);
      window.alert('Employee Updated successfully!!!')
    })
    this.router.navigate(['home'])
    this.refreshList();

  }

  refreshList() {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employeeService.employees = data;
      console.log(data)
    })
  }

}
