/// <reference types="@types/googlemaps" />

import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { UtilityService } from 'src/app/services/utility.service';

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
  cost: Number
  trip_seats: Number

  passenger_name = ""
  accept_trip = ""

  start_pos_lat
  start_pos_long
  end_pos_lat
  end_pos_long

  driver_id

  tripStart: boolean = true
  tripEnd: boolean = false

  distance

  tarifStandard = 1

  constructor(private router: Router, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private utilityService: UtilityService) { }


  currentLoggedInId: any = '';

  ngOnInit() {
    this.currentLoggedInId = localStorage.getItem("id");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 16;
      });
    }

    this.driver_id = localStorage.getItem('id')

    // console.log(this.driver_id)
  }

  object

  save() {
    this.object = {
      'trip_name': this.trip_name,
      'trip_from': this.trip_from,
      'trip_to': this.trip_to,
      'trip_time': new Date(this.trip_time),
      'cost': this.cost,
      'trip_seats': this.trip_seats,
      'start_pos_lat': this.start_pos_lat,
      'start_pos_long': this.start_pos_long,
      'end_pos_lat': this.end_pos_lat,
      'end_pos_long': this.end_pos_long,
      'driver_id': this.driver_id,
    }

    this.utilityService.create_ride(this.object)

    // console.log(object)

    // this.router.navigate(['/driver'])

    this.utilityService.create_ride(this.object).subscribe((res) => {
      // console.log(res)
      this.router.navigate(['/driver'])
    })
  }

  start_pos_lat1
  start_pos_long1
  end_pos_lat1
  end_pos_long1

  markerDragEnd(m: any, event: any) {
    if (this.tripStart) {
      this.start_pos_lat1 = event.coords.lat
      this.start_pos_long1 = event.coords.lng
      // this.tripStart = false
    }

    if (this.tripEnd) {
      this.end_pos_lat1 = event.coords.lat
      this.end_pos_long1 = event.coords.lng
      // this.tripEnd = false
    }
  }

  setStartPoint() {
    this.tripStart = false
    this.tripEnd = true

    this.start_pos_lat = this.start_pos_lat1
    this.start_pos_long = this.start_pos_long1

    // console.log(this.start_pos_lat)
    // console.log(this.start_pos_long)

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     position => {
    //       let geocoder = new google.maps.Geocoder();
    //       let latlng = new google.maps.LatLng(this.start_pos_lat, this.start_pos_long);
    //       let request = {
    //         latLng: latlng
    //       };

    //       geocoder.geocode(request, (results, status) => {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //           if (results[0] != null) {
    //             this.ngZone.run(() => {
    //               this.trip_from = results[0].formatted_address
    //               console.log(this.trip_from)
    //             })
    //           } else {
    //             alert("No address available");
    //           }
    //         }
    //       });
    //     },
    //     error => {
    //       console.log("Error code: " + error.code + "<br /> Error message: " + error.message);
    //     }
    //   );
    // }
  }

  setEndPoint() {
    this.tripEnd = false
    this.tripStart = true

    this.end_pos_lat = this.end_pos_lat1
    this.end_pos_long = this.end_pos_long1

    this.calculate_distance()

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     position => {
    //       let geocoder = new google.maps.Geocoder();
    //       let latlng = new google.maps.LatLng(this.end_pos_lat, this.end_pos_long);
    //       let request = {
    //         latLng: latlng
    //       };

    //       geocoder.geocode(request, (results, status) => {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //           if (results[0] != null) {
    //             this.ngZone.run(() => {
    //               this.trip_to = results[0].formatted_address
    //               console.log(this.trip_to)
    //             })
    //           } else {
    //             alert("No address available");
    //           }
    //         }
    //       });
    //     },
    //     error => {
    //       console.log("Error code: " + error.code + "<br /> Error message: " + error.message);
    //     }
    //   );
    // }
  }

  calculate_distance() {
    const from = new google.maps.LatLng(this.start_pos_lat, this.start_pos_long)
    const to = new google.maps.LatLng(this.end_pos_lat, this.end_pos_long)
    this.distance = google.maps.geometry.spherical.computeDistanceBetween(from, to)

    // console.log(from)
    // console.log(to)

    console.log(this.distance)

    this.cost = (this.distance / 1000) * 1.3
  }

}
