import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/hotel';
import { HotelService } from 'src/app/hotel.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-hotel',
  templateUrl: './ticket-hotel.component.html',
  styleUrls: ['./ticket-hotel.component.css']
})
export class TicketHotelComponent implements OnInit {
  hotelChoosenDetails: any;
  fromDate: Date = new Date();
  returnDate: Date = new Date();
  pic: any[] = [];
  ratePic:any[]=[];
  sl: number = 0;
  checkReviewsRating: any = 0;
  people:any;
  nights:any;
  dollar: string = '';
  price: number = 0;
  finalPrice: any;
  
  constructor(public hotelSer: HotelService,public rout:Router) { }

  ngOnInit(): void {
    
    this.hotelChoosenDetails = this.hotelSer.hotelChoosen;
    console.log("ticket from service");
    console.log(this.hotelChoosenDetails);
    this.fromDate = this.hotelSer.fromDate;
    this.returnDate = this.hotelSer.returnDate;
    console.log(this.fromDate);
    console.log(this.returnDate);
    this.people=this.hotelSer.people;
    this.nights=this.hotelSer.nights;
  }
  pay(){
    swal.fire(
    'Your Order has been successfully recieved!',
    'Our team will contact you asap!',
    'success'
  )
  this.rout.navigateByUrl('home');
  
} 
  level(l: number) {
    this.sl = Math.floor(l);
    for (let i = 0; i < this.sl; i++) {
      this.pic[i] = '⭐';
    }
    for (let i = this.sl; i < 5; i++) {
      
      this.pic[i] = '✩';
      // this.pic[i] = ''../../assets/icons8-star;
    }
    return this.pic;
  }
  checkguestReviewsRating() {
    try {
      this.checkReviewsRating = this.hotelChoosenDetails.guestReviews.rating;
      return this.hotelChoosenDetails.guestReviews.rating;
    }
    catch {
      this.checkReviewsRating =0;
      return 0;
    }

  }
  ratingUsers() {//3.5
    this.sl = Math.floor(this.checkReviewsRating);//3
    for (let i = 0; i < this.sl; i++) {
      this.ratePic[i] = '⬤';
    }
    if (this.checkReviewsRating > this.sl) {
      this.ratePic[this.sl] = '◐';
      for (let i = this.sl + 1; i < 5; i++) {
        this.ratePic[i] = '〇';
      }
    }
    else {
      for (let i = this.sl; i < 5; i++) {
        this.ratePic[i] = '〇';
      }
    }
    return this.ratePic;
  }
  pricePerNightsAndPeople(fullPrice: string) {
    this.dollar = fullPrice.substring(0,1);
    this.price = Number(fullPrice.substring(1, fullPrice.length));
    this.finalPrice = this.dollar + Number((this.price * this.nights)*this.people);
    return  this.finalPrice;
  }
  ifDeals() {
    try {
      return this.hotelChoosenDetails.deals.specialDeal.dealText;
    }
    catch {
      return "There are currently no suitable deals";
    }
  }
  isBadgeText(){
    try{
      return this.hotelChoosenDetails.guestReviews.badgeText;
    }
    catch{
      return '';
    }
  }

}
