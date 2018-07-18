import { ItemsService } from './../../services/items.service';
import { Component, OnInit } from '@angular/core';
import { FilterService } from './../../services/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[];
  allListings: any[];
  status: string;
  search: string;

  constructor(public itemsService: ItemsService, private data: FilterService) {}

  ngOnInit() {
    this.data.currentStatus.subscribe(status => {
      this.status = status;
      this.renderFilter(this.status);
    });
  }

  renderFilter(status) {
    this.allListings = [{}];
    if (status === '') {
      this.itemsService.getAllListing().subscribe(users => {
        users.forEach(user => {
          if (!user.hasOwnProperty('listings')) {
            return;
          }
          for (const key of Object.keys(user.listings)) {
            if (user.listings[key].isSold === true) {
              return;
            }
            const ref = user.listings[key];
            ref.itemKey = key;
            this.allListings.push(user.listings[key]);
          }
        });
      });
    } else {
      this.itemsService.getAllListing().subscribe(users => {
        users.forEach(user => {
          if (!user.hasOwnProperty('listings')) {
            return;
          }
          for (const key of Object.keys(user.listings)) {
            if (user.listings[key].isSold === true) {
              return;
            }
            if (status !== user.listings[key].category) {
              return;
            }
            const ref = user.listings[key];
            ref.itemKey = key;
            this.allListings.push(user.listings[key]);
          }
        });
      });
    }
  }

  searchItem(event: any) {
    this.search = '';
    this.search += event.target.value;
    this.allListings = [{}];
    if (this.search === '') {
      this.itemsService.getAllListing().subscribe(users => {
        users.forEach(user => {
          if (!user.hasOwnProperty('listings')) {
            return;
          }
          for (const key of Object.keys(user.listings)) {
            if (user.listings[key].isSold === true) {
              return;
            }
            const ref = user.listings[key];
            ref.itemKey = key;
            this.allListings.push(user.listings[key]);
          }
        });
      });
    } else {
      this.itemsService.getAllListing().subscribe(users => {
        users.forEach(user => {
          if (!user.hasOwnProperty('listings')) {
            return;
          }
          for (const key of Object.keys(user.listings)) {
            if (user.listings[key].isSold === true) {
              return;
            }
            if (
              user.listings[key].itemName
                .toLowerCase()
                .trim()
                .includes(this.search.toLowerCase())
            ) {
              const ref = user.listings[key];
              ref.itemKey = key;
              this.allListings.push(user.listings[key]);
            } else {
              return;
            }
          }
        });
      });
    }
  }
}
