import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  loginForm : FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,private title:Title,private api:AuthService) { }
  ngOnInit(): void {
    sessionStorage.setItem('vendorLog',"false");
    this.title.setTitle("Login Page");
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]]
    })
  }
  Login() {
    this.api.getUsers()
      .subscribe({
        next: (res) => {
          const user = res.find((a: any) => {
            return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
          });
          console.log(user);
          if (user && user.type==="vendor") {
            alert("Login Successful!!");
            sessionStorage.setItem('vendorEmail',user.email)
            sessionStorage.setItem('vendorLog',"true");
            sessionStorage.setItem('vendorName',user.fullname)
            this.loginForm.reset();
            this.router.navigate(['admin'])
          }
          else if(user && user.type==="customer"){
            alert("Login Successful!!");
            sessionStorage.setItem('customerName',user.fullname);
            sessionStorage.setItem('customerEmail',user.email);
            sessionStorage.setItem('customerLog',"true");
            this.loginForm.reset();
            this.router.navigate(['customer'])
          }
          else {
            alert("User Not Found");
          }
        },
        error: (err) => alert("Something Went Wrong!")
      });
  }
}
