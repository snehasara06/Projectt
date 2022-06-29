import { Component, Input, OnInit } from '@angular/core';
import { TimesheetService } from '../service/timesheet.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { formatDate } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss'],
  providers: [TimesheetService]
})
export class EditTimesheetComponent implements OnInit {
  timesheets: any;
  id!: string;
  project_name!: string;
  date!: Date;
  locale = 'en-US';

  //@Input() timesheet!:Timesheet;

  constructor(private router: Router, private route: ActivatedRoute, protected timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }

  cancel() {
    window.confirm("The Changes is not be saved . Are you sure to leave?")
    this.router.navigate(['home'])
  }

  formData(form: NgForm) {
    this.route.params
      .subscribe(params => {
        //console.log(params._id);
        this.id = params._id
      })
    this.timesheetService.getTimesheetById(this.id).subscribe((data) => {

      data.date = formatDate(data.date, 'yyyy-MM-dd', this.locale);

      form.setValue({
        _id: data._id,
        project_name: data.project_name,
        date: data.date,
        timesheet_name: data.timesheet_name,
        addedBy: data.addedBy,
        description: data.description,
        duration: data.duration,
        __v: data.__v
      })
    })

    return true;
  }


  Onsubmit(form: NgForm) {
   
    console.log(this.id)
    this.timesheetService.putTimesheet(form.value).subscribe((data) => {
      console.log(data);
    })

    window.alert('Updated successfully !!!')
    this.router.navigate(['home'])
    this.refreshList();
  }

  refreshList() {
    this.timesheetService.getTimesheet().subscribe((data) => {
      this.timesheetService.timesheets = data;
      console.log(data)
    })
  }

}
