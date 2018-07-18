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
  purchaseList: any[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.itemsService.getMyListing().subscribe(listings => {
      this.listings = listings;
    });
    this.itemsService.getMyPurchase().subscribe(users => {
      let buyer = '';
      this.purchaseList = [{}];
      this.authService.getAuth().subscribe(auth => {
        if (!auth) {
          this.router.navigate(['/login']);
        } else {
          buyer = auth.uid;
          users.forEach(user => {
            if (!user.hasOwnProperty('listings')) {
              return;
            }
            for (const key of Object.keys(user.listings)) {
              console.log(user.listings[key].buyer);
              console.log(buyer);
              if (buyer === user.listings[key].buyer) {
                const ref = user.listings[key];
                ref.itemKey = key;
                this.purchaseList.push(user.listings[key]);
              } else {
                return;
              }
            }
          });
        }
      });
    });
  }
  addListing() {
    this.router.navigate(['/addlisting']);
  }

  openItem() {
    console.log('thisworks');
  }
}
