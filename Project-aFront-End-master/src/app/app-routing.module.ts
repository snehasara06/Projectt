import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { Roles } from './service/userRoles';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'create-timesheet', component: TimesheetComponent, canActivate: [AuthGuard] },
  { path: 'timesheet/:_id', component: TimesheetComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employee/:_id', component: EditEmployeeComponent, canActivate: [AuthGuard] },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
