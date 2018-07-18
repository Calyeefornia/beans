import { ItemsService } from './../../services/items.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { EthcontractService } from './../../services/ethcontract.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private itemsService: ItemsService,
    private ethContractService: EthcontractService,
    private flashMessagesService: FlashMessagesService
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

  ethSellerVote(_exchangeHash) {
    let seller = '';
    const that = this;
    console.log(_exchangeHash);
    this.ethContractService.getAccInfo().then(function(acctInfo) {
      const obj = { ...acctInfo };
        if (obj['fromAccount']) {
          seller = obj['fromAccount'];
          console.log(seller);
          that.ethContractService.sellerVoteEscrow(_exchangeHash, seller).subscribe((result) => {
            console.log(result);
            that.flashMessagesService.show('YOU HAVE SUCCESSFULLY SENT ITEM', {
              cssClass: 'alert-success',
              timeout: 4000
            });
          }, err => {
            console.log('failure');
            that.flashMessagesService.show('YOU ARE NOT ALLOWED TO DO THIS', {
              cssClass: 'alert-danger',
              timeout: 4000
            });
          });
        }
    });

  }

  ethBuyerVote(_exchangeHash, sellerKey, itemKey){
    let buyer = '';
    const that = this;
    console.log(sellerKey);
    console.log(itemKey);
    this.ethContractService.getAccInfo().then(function(acctInfo) {
      const obj = { ...acctInfo };
        if (obj['fromAccount']) {
          buyer = obj['fromAccount'];
          console.log(buyer);
          that.ethContractService.buyerVoteEscrow(_exchangeHash, buyer).subscribe((result) => {
            console.log(result);
            that.itemsService.isSoldUpdate(sellerKey, itemKey);
            that.flashMessagesService.show('YOU HAVE SUCCESSFULLY PAID', {
              cssClass: 'alert-success',
              timeout: 4000
            });
          }, err => {
            console.log('failure');
            that.flashMessagesService.show('YOU ARE NOT ALLOWED TO DO THIS', {
              cssClass: 'alert-danger',
              timeout: 4000
            });
          });
        }
    });
  }
}
