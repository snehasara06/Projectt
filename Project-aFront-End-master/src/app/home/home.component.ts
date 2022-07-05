import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timesheet } from '../service/timesheet';
import { TimesheetService } from '../service/timesheet.service';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TimesheetService]
})
export class HomeComponent implements OnInit {

  timesheets: Timesheet[] = []
  visible!: boolean;
  show!: boolean;
  selectedTimeSheet!: String


  constructor(private router: Router, protected timesheetService: TimesheetService, protected employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.timesheetList();
    //console.log(this.employeeService.loginRole)
  }

  logout() {
    this.router.navigate(['login'])
  }

  editTimeSheet(ts: Timesheet) {
    this.timesheetService.getTimesheetById(ts._id).subscribe((data) => {
      // console.log(data)
      this.timesheetService.selectedTimeSheet = data;
      this.selectedTimeSheet = this.timesheetService.timesheetToEdit()

      this.router.navigate(['/timesheet/' + this.selectedTimeSheet])
    })

  }

  deleteTimeSheet(data: any) {
    if (window.confirm("The Timesheet will be deleted and cannot be reterived . Are you sure to delete this?")) {
      this.timesheetService.deleteTimesheet1(data._id).subscribe((data1) => {
        this.timesheetList();
      })
    }
    else {
      this.timesheetList();
    }
  }

  createTimeSheet() {
    this.router.navigate(['create-timesheet'])
  }

  timesheetList() {
    if (this.employeeService.loginManager()) {
      this.show = true
    }
    //  console.log(this.employeeService.loginData)
    this.timesheetService.getTimesheet().subscribe((data) => {
      this.timesheetService.timesheets = data;
      if (data != 0) {
        this.visible = false;
      }
      else {
        this.visible = true;
      }
    })

  }
  viewEmployees() {
    this.router.navigate(['employees'])
  }
}
