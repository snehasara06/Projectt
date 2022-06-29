import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'create-timesheet',component:TimesheetComponent},
  {path:'edit-timesheet/:_id',component:EditTimesheetComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
