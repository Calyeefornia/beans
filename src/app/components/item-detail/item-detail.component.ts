import { ItemsService } from './../../services/items.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  itemId: string;
  itemDetails: any;
  msgValue: string;
  messages: any;

  constructor(
    public itemsService: ItemsService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) {}

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
    this.itemId = this.route.snapshot.params['id'];
    this.itemsService.getMyItem(this.itemId).subscribe(item => {
      item.forEach(i => {
        this.itemDetails[i.key] = i.val;
      });
    });
    this.itemsService.retrieveMessages(this.itemId).subscribe(messages => {
      this.messages = messages;
    });
  }
  deleteItem() {
    this.itemsService
      .deleteMyItem(this.itemId)
      .then(() => {
        this.router.navigate(['/profile']);
        this.flashMessagesService.show('SUCCESSFULLY DELETED ITEM', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      })
      .catch(err => console.log(err));
  }

  sendChat(msg) {
    this.itemsService.updateChatSeller(msg, this.itemId);
    this.msgValue = '';
  }
}
