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
    return this.http.post(this.rootUrl + '/login', object)
  }

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
