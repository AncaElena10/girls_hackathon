import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {

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
