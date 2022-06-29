import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Timesheet } from '../service/timesheet';
import { TimesheetService } from '../service/timesheet.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TimesheetService]
})
export class HomeComponent implements OnInit {

  timesheets: Timesheet[] = []
  visible!: boolean;
  selectedTimeSheet!:String
  constructor(private router: Router, protected timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.timesheetList();
  }

  logout() {
    this.router.navigate(['login'])
  }

  signUp() {
    this.router.navigate(['sign-up'])
  }

  editTimeSheet(ts: Timesheet) {
     this.timesheetService.getTimesheetById(ts._id).subscribe((data) => {
   // console.log(data)
    this.timesheetService.selectedTimesheet=data;
    this.selectedTimeSheet=this.timesheetService.timesheetToEdit()
    
    this.router.navigate(['edit-timesheet/'+this.selectedTimeSheet])
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
}
