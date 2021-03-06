import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ItemsService {
  users: AngularFireList<any>;
  user: AngularFireList<any>;
  userListings: AngularFireList<any>;
  userPersonal: AngularFireList<any>;
  userReceipts: AngularFireList<any>;
  uid: string;
  email: string;

  constructor(public af: AngularFireDatabase, public authService: AuthService) {
    authService.getAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.email = auth.email;
        this.user = this.af.list('users/' + this.uid);
        this.userListings = this.af.list('users/' + this.uid + '/listings');
      }
    });
    this.users = this.af.list('/users');
  }

  upload(imgUrl, itemName, price, description, category) {
    const Listing: any = {
      imgUrl: imgUrl,
      itemName: itemName,
      price: price,
      description: description,
      category: category,
      buyer: '',
      isSold: false,
      seller: this.uid
    };
    this.userListings.push(Listing);
  }

  getMyListing() {
    return this.userListings
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  getMyItem(itemId) {
    return this.af
      .list('users/' + this.uid + '/listings/' + itemId)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, val: c.payload.val() }))
        )
      );
  }

  getAllListing() {
    return this.users.valueChanges();
  }

  getParticularListing(uid, itemId) {
    return this.af
      .list('users/' + uid + '/listings/' + itemId)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, val: c.payload.val() }))
        )
      );
  }
  getUserEthAcc(sellerId) {
    return this.af.object('users/' + sellerId + '/personal/').valueChanges();
  }

  updateEscrow(uid, itemId, escrowHashLocation, buyerUid) {
    return this.af.object('users/' + uid + '/listings/' + itemId).update({
      buyer: buyerUid,
      hashMapping: escrowHashLocation,
      isProccessing: true
    });
  }

  getMyPurchase() {
    return this.users
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  isSoldUpdate(sellerId, itemId) {
    return this.af.object('users/' + sellerId + '/listings/' + itemId).update({
      isSold: true
    });
  }

  getAllListinWithKey() {
    return this.users
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  deleteMyItem(itemId) {
    return this.af
      .object('users/' + this.uid + '/listings/' + itemId)
      .set(null);
  }

  updateChatSeller(msg, itemId) {
    this.af
      .list('users/' + this.uid + '/listings/' + itemId + '/messages')
      .push({ message: msg, name: this.email });
  }

  retrieveMessages(itemId) {
    return this.af
      .list('users/' + this.uid + '/listings/' + itemId + '/messages')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  retrieveMessagesBuyer(itemId, sellerId) {
    return this.af
      .list('users/' + sellerId + '/listings/' + itemId + '/messages')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  updateChatBuyer(msg, itemId, userId) {
    this.af
      .list('users/' + userId + '/listings/' + itemId + '/messages')
      .push({ message: msg, name: this.email });
  }
}
