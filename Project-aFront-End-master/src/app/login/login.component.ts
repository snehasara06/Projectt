import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  
  constructor(private router:Router,private authService:AuthServiceService) { }

  name:string=''
  passwordVal:string=''

  ngOnInit(): void {
  }
  
  login(form:NgForm){
      this.authService.login(form.value).subscribe((data: any)=>{
        if(data){
          console.log(data)
        }
        else{
          console.log("NO")
        }
      })
     this.router.navigate(['/home'])
  }

  signUp(){
    this.router.navigate(['/sign-up'])
  }

}
