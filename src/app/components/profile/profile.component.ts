import { ItemsService } from './../../services/items.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  listings: any[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.getMyListing().subscribe(listings => {
      this.listings = listings;
    });
  }
  addListing() {
    this.router.navigate(['/addlisting']);
  }

  openItem() {
    console.log("thisworks");
  }

}
