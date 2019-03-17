import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader) { }

  trip_name = ""
  trip_from = ""
  trip_to = ""
  trip_time = ""
  trip_cost = ""
  trip_seats = ""

  passenger_name = ""
  accept_trip = ""

  // lat: number = 51.673858;
  // lng: number = 7.815982;
  lat: number
  lng: number
  zoom: number = 8;
  coordinates
  element: HTMLInputElement

  // google: any

  public searchControl: FormControl;


  @ViewChild("search")
  public searchElementRef: ElementRef;

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
  }

  public handleAddressChange(address) {
    // Do some stuff
    console.log(address)
  }
}
