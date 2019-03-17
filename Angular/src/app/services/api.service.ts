import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rootUrl = "api"


  constructor(private http: HttpClient) { }

  login(object) {
    return this.http.post("http://40.121.66.13:8080/api/ridesharing/login/", object)
  }

  register(object) {
    return this.http.post("http://40.121.66.13:8080/api/ridesharing/register/", object)
  }
}
