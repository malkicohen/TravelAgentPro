import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/flights.service';
import { user } from 'src/app/user';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(public flightS: FlightsService, public rout: Router) { }
  detailsF: any;
  pessanger: any;
  userName: string = "";
  userLastName: string = "";

  pay() {
    swal.fire(
      'Your Order has been successfully recieved!',
      'Our team will contact you asap!',
      'success'
    )
    this.rout.navigateByUrl('home');
  }
  ngOnInit(): void {
    this.detailsF = this.flightS.myFlight;
    this.pessanger = sessionStorage.getItem('thisUser');
    try {
      this.userName = JSON.parse(this.pessanger).firstName;
      this.userLastName = JSON.parse(this.pessanger).lastName;
    }
    catch {
      Swal.fire({
        title: 'Oops',
        text: 'You must register first',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
      this.rout.navigateByUrl("login");
    }
  }
}
