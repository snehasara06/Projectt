import { formatDate } from '@angular/common';
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
  id: string = '';
  ts: any;
  locale: any = 'en-US'
  visible: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, protected timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        //console.log(params._id);
        this.id = params._id
      })
    if (this.id != undefined) {
      this.visible = true
    }
  }

  formData(form: NgForm) {
    this.timesheetService.getTimesheetById(this.id).subscribe((data) => {

      data.date = formatDate(data.date, 'yyyy-MM-dd', this.locale);

      form.setValue({
        _id: data._id,
        project_name: data.project_name,
        date: data.date,
        timesheet_name: data.timesheet_name,
        addedBy: data.addedBy,
        description: data.description,
        duration: data.duration
      })
    })

    return true;
  }

  logout() {
    this.router.navigate(['login'])
  }

  back() {
    this.router.navigate(['home'])
  }

  cancel() {
    window.confirm("The Changes is not saved . Are you sure to leave?")
    this.router.navigate(['home'])
  }

  Onsubmit(form: NgForm) {

    //console.log("hello : " + this.timesheetService.description);
    if (this.id != undefined) {
      //console.log('edit')
      this.timesheetService.putTimesheet(form.value).subscribe((data) => {
        console.log(data);
        window.alert('TimeSheet Updated successfully!!!')
      })
    }

    else {
      this.timesheetService.postTimesheet(form.value).subscribe((data) => {
        console.log(data);
      })
      window.alert('TimeSheet Saved successfully!!!')
    }
    this.router.navigate(['home'])
    this.refreshList();
  }

  refreshList() {
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
