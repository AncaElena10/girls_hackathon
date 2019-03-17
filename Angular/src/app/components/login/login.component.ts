import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // userEmail
  // userPassword
  // userPasswordAgain

  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    // console.log(this.loginForm.value)

    this.apiService.login(this.loginForm.value).subscribe((res) => {
      // console.log(res)
      // console.log("logat")
      // this.router.navigate(['/home'])
      this.extractUserInfo(res)
      window.location.reload();
    })
  }

  extractUserInfo(res) {
    // console.log(res)
    localStorage.setItem('id', res.id);
    localStorage.setItem('email', res.email);
  }

  register() {
    this.submitted = true;
    // console.log(this.registerForm.value)

    this.apiService.register(this.loginForm.value).subscribe((res) => {
      console.log(res)
      // this.router.navigate(['/home'])
      window.location.reload();
    });
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem("loggedIn", this.loggedInStatus);
    localStorage.clear();
  }

  getLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  getLoggedInStatus() {
    return localStorage.getItem('loggedIn');
  }
}
