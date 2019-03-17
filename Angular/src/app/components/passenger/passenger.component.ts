import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  chart: Object;

  ngOnInit() {

  }

  constructor() {
    this.chart = {
      title: 'Pie Chart',
      type: 'PieChart',
      columnNames: ['Task', 'Hours per Day'],
      data: [
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
      ],
      roles: []
    };

  }
}
