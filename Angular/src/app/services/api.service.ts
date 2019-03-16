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
    return this.http.post(this.rootUrl + '/login', object)
  }

  register(object) {
    return this.http.post(this.rootUrl + '/register', object)
  }
}
