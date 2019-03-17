/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  lat: number
  lng: number
  zoom: number

  trip_name = ""
  trip_from = ""
  trip_to = ""
  trip_time = ""
  trip_cost = ""
  trip_seats = ""

  passenger_name = ""
  accept_trip = ""

  constructor(private router: Router) { }

  ngOnInit() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 16;
      });
    }
  }

  save() {
    let object = {
      'trip_name': this.trip_name,
      'trip_from': this.trip_from,
      'trip_to': this.trip_to,
      'trip_time': this.trip_time,
      'trip_cost': this.trip_cost,
      'trip_seats': this.trip_seats,
    }

    console.log(object)

    // this.router.navigate(['/driver'])

    this.getLocation()
  }

  getLocation(): Observable<any> {
    var address = this.trip_from

    console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocoder();
    console.log(geocoder)
    return Observable.create(observer => {
      console.log("ajskbd")
      geocoder.geocode({
        'address': address
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          console.log('Error: ', results, ' & Status: ', status);
          observer.error();
        }
      });
      console.log("aici")
      console.log(geocoder)
    });
  }

}
