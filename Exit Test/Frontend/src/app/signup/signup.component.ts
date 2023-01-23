import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';
import { User } from './user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  userObj: User = new User();
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private title: Title, private api: AuthService) { }
  ngOnInit(): void {
    this.title.setTitle("Signup Page")
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]]

    })
  }
  Signup() {
    this.userObj.fullname = this.signupForm.value.fullname;
    this.userObj.email = this.signupForm.value.email;
    this.userObj.password = this.signupForm.value.password;
    this.userObj.type = this.signupForm.value.type;
    console.log(this.userObj)
    this.api.getUsers()
      .subscribe((res) => {
        const user = res.find((a: any) => {
          return a.email.toLowerCase() === this.signupForm.value.email.toLowerCase();
        })
        if (user) {
          alert("User Email Id Already Exists!!")
        }
        else {
          this.api.registerUser(this.userObj)
            .subscribe((res) => {
              alert("Signup Successfully!");
              this.signupForm.reset();
              this.router.navigate(['index']);
            });
        }
      });
  }
}
