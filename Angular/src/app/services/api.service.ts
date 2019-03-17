import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rootUrl = "api"
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient) { }

  login(object) {
    return this.http.post("http://40.121.66.13:8080/api/ridesharing/login/", object)
  }

  login_2() {
    return this.http.get("http://40.121.66.13:8080/api/ridesharing/get_test/")
  }

  // login(body: any) {
  //   return this.http.post("http://40.121.66.13:8080/api/ridesharing/login/", body, {
  //     observe: 'body',
  //     withCredentials: true,
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   }).toPromise().then((x) => {
  //     // localStorage.setItem('email', x.email);
  //     // localStorage.setItem('phone', x.phone_nr);
  //     // localStorage.setItem('job', x.job);
  //     // localStorage.setItem('group_email', x.group_email);
  //     // localStorage.setItem('user_type', x.user_type);
  //     // localStorage.setItem('name', x.name);
  //     // localStorage.setItem('token', x.token);
  //     // localStorage.setItem('timeout', x.timeout);
  //   });
  // }

  register(object) {
    return this.http.post(this.rootUrl + '/register', object)
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
