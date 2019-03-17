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

  currentLoggedInId: any = '';

  ngOnInit() {
    this.currentLoggedInId = localStorage.getItem("id");
    this.get_history_trips()
  }

  constructor(private utilityService: UtilityService) {

    this.piechart = {
      title: 'Pie Chart',
      type: 'PieChart',
      columnNames: ['Task', 'Hours per Day'],
      data: [
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Sleep', 7]
      ],
      roles: []
    };
    this.linechart = {
      title: 'Money spent on taxi every month',
      type: 'LineChart',
      columnNames: ['Element', 'Density'],
      roles: [
        { type: 'number', role: 'interval' },
        { type: 'number', role: 'interval' },
        { type: 'string', role: 'annotation' },
        { type: 'string', role: 'annotationText' },
        { type: 'boolean', role: 'certainty' }
      ],
      data: [
        ['January', 1000],
        ['February', 1170],
        ['March', 660],
        ['April', 1030],
        ['May', 1000],
        ['June', 660],
        ['July', 1030],
        ['August', 1000],
        ['September', 1170],
        ['October', 660],
        ['November', 1030],
        ['December', 1030]
      ]
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

  extractHistoryTrips(res) {
    this.history_trips = res
  }
}

