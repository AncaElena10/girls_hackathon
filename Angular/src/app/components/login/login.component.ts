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

  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    console.log(this.loginForm.value)

    // this.apiService.login(this.loginForm.value).subscribe((res) => {
    //   console.log(res)
    //   this.router.navigate(['/profile'])
    // });
  }


  register() {
    this.submitted = true;
    console.log(this.registerForm.value)

    // this.apiService.register(this.loginForm.value).subscribe((res) => {
    //   console.log(res)
    //   this.router.navigate(['/login'])
    // });
  }

}
