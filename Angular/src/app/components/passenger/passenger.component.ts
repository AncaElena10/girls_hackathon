import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  piechart;
  linechart;
  barchart;

  available_trips = [{
    "trip_name": "otopeni-unirii",
    'trip_from': "otopeni",
    'trip_to': "unirii",
    "trip_time": "2019-03-17T03:34:34+00:00",
    "cost": 15.12,
    "trip_seats": 2,
    "driver_id": 1,
  },
  {
    "trip_name": "drstr-berc",
    'trip_from': "dristor",
    'trip_to': "berceni",
    "trip_time": "2019-04-17T03:34:34+00:00",
    "cost": 12.78,
    "trip_seats": 3,
    "driver_id": 1,
  }, {
    "trip_name": "TEEEEEEST1",
    'trip_from': "pantelimon",
    'trip_to': "militari",
    "trip_time": "2019-04-17T03:34:34+00:00",
    "cost": 21.18,
    "trip_seats": 3,
    "driver_id": 2,
  }]

  next_trips = [{
    "trip_name": "bucuresti-ploiesti",
    'trip_from': "bucuresti",
    'trip_to': "ploiesti",
    "trip_time": "2019-03-28T03:34:34+00:00",
    "cost": 83.1212,
    "trip_seats": 2,
    "driver_id": 1,
  },
  {
    "trip_name": "berceni-pipera",
    'trip_from': "berceni",
    'trip_to': "pipera",
    "trip_time": "2019-04-17T03:34:34+00:00",
    "cost": 35.3124,
    "trip_seats": 1,
    "driver_id": 1,
  }, {
    "trip_name": "test trip",
    'trip_from': "pantelimon",
    'trip_to': "militari",
    "trip_time": "2019-05-23T03:34:34+00:00",
    "cost": 20.1128,
    "trip_seats": 3,
    "driver_id": 2,
  }]

  currentLoggedInId: any = '';

  ngOnInit() {
    this.currentLoggedInId = localStorage.getItem("id");
    this.get_history_trips()
  }

  constructor(private utilityService: UtilityService) {

    this.piechart = {
      title: 'Money spent last 4 months',
      type: 'PieChart',
      columnNames: ['Task', 'Hours per Day'],
      data: [
        ['March', 11],
        ['February', 2],
        ['January', 2],
        ['December', 7]
      ],
      roles: []
    };

    this.barchart = {
      title: 'Material Bar Chart',
      type: 'Bar',
      columnNames: ['Rush Hours', 'StudentCab', 'Paxify', 'Muber'],
      roles: [],
      data: [
        ['8:00', 1.3, 2, 2],
        ['12:00', 1.3, 1.5, 2.5],
        ['17:00', 1.3, 1.8, 3],
        ['19:00', 1.3, 2.2, 3.5]
      ],
    };

  }

  onClick(id) {
    // console.log(id)
    let obj = {
      "passenger_id": this.currentLoggedInId
    }

    this.utilityService.add_ride(id, obj)
  }

  history_trips = []

  // get_all_trips() {
  //   this.utilityService.get_all_trips().subscribe((res) => {
  //     this.extract_all_trips(res)
  //   })
  // }

  // extract_all_trips(res) {
  //   this.all_trips = res
  // }

  get_history_trips() {
    this.utilityService.get_trips_history_passenger(this.currentLoggedInId).subscribe((res) => {
      console.log(res)
      this.extractHistoryTrips(res)
    })
  }

  // available_trips = []
  // next_trips = []

  extractHistoryTrips(res) {
    this.history_trips = res

    // var crtDate = new Date()

    // for (let i = 0; i < this.history_trips.length; i++) {
    //   if (new Date(this.history_trips[i].start_time) > crtDate && this.history_trips[i].trip_seats > 0) {
    //     this.available_trips.push(this.history_trips[i])
    //   }


    // }
  }
}

