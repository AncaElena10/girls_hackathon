/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';

const place = null as google.maps.places.PlaceResult;

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
