import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  barchart;
  constructor(private router: Router) {
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

  currentLoggedInId: any = '';


  ngOnInit() {
    this.currentLoggedInId = localStorage.getItem("id");
    // console.log(this.currentLoggedInId)
  }

  driver(event) {
    // console.log(event)
    if (event.target.id == "sofer_") {
      this.router.navigate(['/driver'])
    }
  }

  pasager(event) {
    // console.log(event)
    if (event.target.id == "pasager_") {
      this.router.navigate(['/passenger'])
    }
  }

  scrollToSection(section) {
    document.getElementById(section).scrollIntoView({ block: 'center', inline: 'center' });
  }

  logout() {
    localStorage.clear();
    // this.router.navigate(['/home'])
    window.location.reload();
  }
}










