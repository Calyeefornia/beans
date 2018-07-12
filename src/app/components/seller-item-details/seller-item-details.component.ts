import { Component, OnInit } from '@angular/core';
import { ItemsService } from './../../services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-seller-item-details',
  templateUrl: './seller-item-details.component.html',
  styleUrls: ['./seller-item-details.component.css']
})
export class SellerItemDetailsComponent implements OnInit {
  itemId: string;
  userId: string;
  itemDetails: any;

  constructor(
    private itemsService: ItemsService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.itemDetails = {
      buyer: '',
      category: '',
      description: '',
      imgUrl: '',
      isSold: false,
      itemName: '',
      price: 1
    };
    this.userId = this.route.snapshot.params['seller'];
    this.itemId = this.route.snapshot.params['id'];
    this.itemsService.getParticularListing(this.userId, this.itemId).subscribe(item => {
      item.forEach(i => {
          this.itemDetails[i.key] = i.val;
      });
      console.log(this.itemDetails);
    });
  }

}
