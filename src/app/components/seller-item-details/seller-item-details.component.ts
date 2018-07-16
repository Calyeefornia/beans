import { AuthService } from './../../services/auth.service';
import { EthcontractService } from './../../services/ethcontract.service';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from './../../services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
    private authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private ethContractService: EthcontractService
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
    this.userId = this.route.snapshot.params['seller'];
    this.itemId = this.route.snapshot.params['id'];
    this.itemsService
      .getParticularListing(this.userId, this.itemId)
      .subscribe(item => {
        item.forEach(i => {
          this.itemDetails[i.key] = i.val;
        });
      });
  }
  onPurchaseReq() {
    let buyer = '';
    this.authService.getAuth().subscribe(auth => {
      if (!auth) {
        this.router.navigate(['/login']);
      }
    });
    const that = this;
    this.ethContractService
      .getAccInfo()
      .then(function(acctInfo) {
        const obj = { ...acctInfo };
        if (obj['fromAccount']) {
          buyer = obj['fromAccount'];
          that.itemsService.getUserEthAcc(that.userId).subscribe((add) => {
            const price = that.itemDetails.price;
            const sellerAddress = add['ethAddress'];
            console.log(sellerAddress);
            that.ethContractService.createEscrow(price, sellerAddress, buyer);

          });

        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
