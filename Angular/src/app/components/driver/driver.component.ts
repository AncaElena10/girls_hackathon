/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';

const place = null as google.maps.places.PlaceResult;

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {

  trips_list = [{
    "trip_name": "TEEEEEEST",
    'trip_from': "otopeni",
    'trip_to': "unirii",
    "trip_time": "2019-03-17T03:34:34+00:00",
    "cost": 12,
    "trip_seats": 2,
    "driver_id": 1,
  },
  {
    "trip_name": "TEEEEEEST1",
    'trip_from': "otopeni1",
    'trip_to': "unirii1",
    "trip_time": "2020-03-17T03:34:34+00:00",
    "cost": 12,
    "trip_seats": 2,
    "driver_id": 1,
  }]

  // trips_list = []

  constructor(private apiService: ApiService, private utilityService: UtilityService) {

  }

  currentLoggedInId: any = '';

  history_trips = []

  ngOnInit() {
    this.currentLoggedInId = localStorage.getItem("id");
    this.get_history_trips()

    console.log(new Date())
  }

  get_history_trips() {
    this.utilityService.get_trips_history_driver(this.currentLoggedInId).subscribe((res) => {
      // console.log(res)
      this.extractHistoryTrips(res)
    })
  }

  past_trips = []
  next_trips = []

  extractHistoryTrips(res) {
    this.history_trips = res

    var crtDate = new Date()

    for (let i = 0; i < this.history_trips.length; i++) {
      if (new Date(this.history_trips[i].start_time) < crtDate) {
        this.past_trips.push(this.history_trips[i])
      } else {
        this.next_trips.push(this.history_trips[i])
      }
    }
  }
}
