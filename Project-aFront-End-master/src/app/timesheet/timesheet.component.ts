import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Route } from '@angular/router'
import { Timesheet } from '../service/timesheet';
import { TimesheetService } from '../service/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  providers: [TimesheetService]
})
export class TimesheetComponent implements OnInit {

  timesheetList: Timesheet[] = []
  constructor(private router: Router, protected timesheetService: TimesheetService) { }

  ngOnInit(): void {

  }

  cancel() {
    this.router.navigate(['home'])
  }
  Onsubmit(form: NgForm) {
    
      //console.log("hello : " + this.timesheetService.description);
      this.timesheetService.postTimesheet(form.value).subscribe((data) => {
        console.log(data);
      })
      window.alert('TimeSheet Saved successfully!!!')
      this.router.navigate(['home'])
      this.refreshList();
  }

  refreshList(){
    this.timesheetService.getTimesheet().subscribe((data) => {
      this.timesheetService.timesheets = data;
      console.log(data)
    })
  }
  // reset(){
  //   this.timesheetService.selectedTimesheet={
  //       project_name:"",
  //       date:"",
  //       timesheet_name:"",
  //       addedBy:"",
  //       description:"",
  //       duration:""
  //   }
  // }

}
