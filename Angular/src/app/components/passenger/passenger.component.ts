import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  piechart;
  linechart;
  barchart;

  ngOnInit() {

  }

  constructor() {

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

  }
}