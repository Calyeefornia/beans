import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable()
export class AuthService {
  user: AngularFireObject<any>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {}
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  // Check user status
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithPopup(new auth.FacebookAuthProvider())
        .then(userData => resolve(userData), err => reject(err));
    });
  }
  googleLogin() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithPopup(new auth.GoogleAuthProvider())
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  updateUserInfo(uid, username, email, ethAccount) {
    this.user = this.af.object('users/' + uid + '/personal');
    const personal = {
      email: email,
      name: username,
      ethAddress: ethAccount
    };
    this.user.set(personal);
  }
}
