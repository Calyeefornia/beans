import { Component, OnInit } from '@angular/core';
import { ItemsService } from './../../services/items.service';
import { EthcontractService } from './../../services/ethcontract.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allUnsoldListings: any[];
  search: string;
  constructor(
    private itemsService: ItemsService,
    private ethContractService: EthcontractService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.populateUnsoldItems();
  }

  populateUnsoldItems() {
    this.allUnsoldListings = [{}];
    this.itemsService.getAllListinWithKey().subscribe(users => {
      users.forEach(user => {
        if (!user.hasOwnProperty('listings')) {
          return;
        }
        for (const key of Object.keys(user.listings)) {
          if (user.listings[key].isSold === true) {
            continue;
          }
          const ref = user.listings[key];
          ref.itemKey = key;
          this.allUnsoldListings.push(user.listings[key]);
        }
      });
    });
  }
  searchItem(event: any) {
    this.search = '';
    this.search += event.target.value;
    this.allUnsoldListings = [{}];
    if (this.search === '') {
      this.itemsService.getAllListinWithKey().subscribe(users => {
        users.forEach(user => {
          if (!user.hasOwnProperty('listings')) {
            return;
          }
          for (const key of Object.keys(user.listings)) {
            if (user.listings[key].isSold === true) {
              continue;
            }
            const ref = user.listings[key];
            ref.itemKey = key;
            this.allUnsoldListings.push(user.listings[key]);
          }
        });
      });
    } else {
      this.itemsService.getAllListinWithKey().subscribe(users => {
        users.forEach(user => {
          if (!user.hasOwnProperty('listings')) {
            return;
          }
          for (const key of Object.keys(user.listings)) {
            if (user.listings[key].isSold === true) {
              continue;
            }
            if (
              user.listings[key].itemName
                .toLowerCase()
                .trim()
                .includes(this.search.toLowerCase())
            ) {
              const ref = user.listings[key];
              ref.itemKey = key;
              this.allUnsoldListings.push(user.listings[key]);
            } else {
              continue;
            }
          }
        });
      });
    }
  }

  favorBuyer(_exchangeHash, itemSeller, itemKey) {
    let admin = '';
    const that = this;
    this.ethContractService.getAccInfo().then(function(acctInfo) {
      const obj = { ...acctInfo };
        if (obj['fromAccount']) {
          admin = obj['fromAccount'];
          that.ethContractService.favorBuyerEscrow(_exchangeHash, admin).subscribe((result) => {
            that.itemsService.isSoldUpdate(itemSeller, itemKey);
            that.flashMessagesService.show('YOU HAVE FAVORED THE BUYER', {
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

  favorSeller(_exchangeHash, itemSeller, itemKey) {
    let admin = '';
    const that = this;
    this.ethContractService.getAccInfo().then(function(acctInfo) {
      const obj = { ...acctInfo };
        if (obj['fromAccount']) {
          admin = obj['fromAccount'];
          that.ethContractService.favorSellerEscrow(_exchangeHash, admin).subscribe((result) => {
            that.itemsService.isSoldUpdate(itemSeller, itemKey);
            that.flashMessagesService.show('YOU HAVE FAVORED THE SELLER', {
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
