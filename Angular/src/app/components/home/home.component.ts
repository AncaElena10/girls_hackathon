import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  driver(event) {
    console.log(event)
    if (event.target.id == "sofer_") {
      this.router.navigate(['/driver'])
    }
  }

  pasager(event) {
    console.log(event)
    if (event.target.id == "pasager_") {
      this.router.navigate(['/passenger'])
    }
  }

}
