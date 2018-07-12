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
}
