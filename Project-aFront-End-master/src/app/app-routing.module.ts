import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'create-timesheet',component:TimesheetComponent,canActivate:[AuthGuard]},
  {path:'edit-timesheet/:_id',component:EditTimesheetComponent,canActivate:[AuthGuard]},
  {path:'employees',component:EmployeeComponent,canActivate:[AuthGuard]},


  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
