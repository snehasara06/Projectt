import { Injectable } from '@angular/core';
import { Timesheet } from './timesheet';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http: HttpClient) { }
  _id!:Timesheet
  project_name!: Timesheet;
  date!: Timesheet;
  timesheet_name!: Timesheet;
  addedBy!: Timesheet;
  description!: Timesheet;
  duration!: Timesheet;
  __v!:number;

  readonly baseURL = "http://localhost:9000/timesheet/";
  selectedTimesheet!: Timesheet;
  timesheets!: Timesheet[];

  timesheetToEdit(){
    return this.selectedTimesheet._id;
  }
  getTimesheet() {
    return this.http.get<any>(this.baseURL)
  }

  getTimesheetById(_id: String) {
    return this.http.get<any>(this.baseURL + `${_id}`)
  }

  postTimesheet(timesheet: Timesheet) {
    return this.http.post(this.baseURL, timesheet);
  }

  putTimesheet(ts:any) {
    console.log(ts)
    return this.http.put(this.baseURL + 'update/'+`${ts._id}` , ts, { responseType: 'text' });
  }

  deleteTimesheet1(_id: String) {
    return this.http.delete(this.baseURL + 'delete/'+ `${_id}`, { responseType: 'text' });
  }
}
