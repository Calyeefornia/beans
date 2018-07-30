import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, public afAuth: AngularFireAuth, private flashMessagesService: FlashMessagesService) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(auth => {
      if (!auth || auth.uid !== 'ypxnVz52EidhRbx6z3FEaCwt3EH3') {
        this.router.navigate(['/login']);
        this.flashMessagesService.show('YOU ARE NOT ALLOWED THERE', {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        return false;
      } else {
        return true;
      }
    });
  }
}
