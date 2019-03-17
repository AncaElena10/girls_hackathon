import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  tripsArray = []

  constructor(private http: HttpClient) { }

  create_ride(object) {
    console.log(object)
    return this.http.post('http://40.121.66.13:8080/api/ride/create_ride/', object)
  }

  // trips(object) {
  //   console.log(object)
  // }
}
