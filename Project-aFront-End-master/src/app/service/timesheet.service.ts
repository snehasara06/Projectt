import { Injectable } from '@angular/core';
import { Timesheet } from './timesheet';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http: HttpClient, private router: Router) { }
  _id!: Timesheet
  project_name!: Timesheet;
  date!: Timesheet;
  timesheet_name!: Timesheet;
  addedBy!: Timesheet;
  description!: Timesheet;
  duration!: Timesheet;
  __v!: number;

  readonly baseURL = "http://localhost:9000/timesheet/";
  selectedTimeSheet!: Timesheet;
  timesheets!: Timesheet[];

  timesheetToEdit() {
    // console.log(this.selectedTimesheet._id)
    return this.selectedTimeSheet._id;
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

  putTimesheet(ts: any) {
    console.log(ts)
    return this.http.put(this.baseURL + 'update/' + `${ts._id}`, ts, { responseType: 'text' });
  }

  deleteTimesheet1(_id: String) {
    return this.http.delete(this.baseURL + 'delete/' + `${_id}`, { responseType: 'text' });
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigate(['login'])
  }
}
