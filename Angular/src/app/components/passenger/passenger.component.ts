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
      title: 'Styled Line Chart',
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
        ['April', 1000],
        ['May', 1170],
        ['June', 660],
        ['July', 1030]
      ]
    };
    this.barchart = {
      title: 'Material Bar Chart',
      type: 'Bar',
      columnNames: ['Year', 'Sales', 'Expenses', 'Profit'],
      roles: [],
      data: [
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
    };

  }
}
