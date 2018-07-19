import { Injectable } from '@angular/core';
import * as TruffleContract from 'truffle-contract';
import { Observable } from 'rxjs/Observable';

const Web3 = require('web3');
declare let require: any;

declare let window: any;
const tokenABI = require('../../../build/contracts/Escrow.json');

@Injectable()
export class EthcontractService {
  private _account: string = null;
  private web3Provider: null;
  private _tokenContract: any;
  private _tokenContractAddress: '0xB56A56A107d4AD0C53841d42c1e0456778aa1bA6';
  private web3: any;
  Escrow = TruffleContract(tokenABI);

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      console.warn('Using web3 detected from external source.');
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn('No web3 detected.');
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
    this.Escrow.setProvider(this.web3.currentProvider);
  }
  getAccInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          return resolve({
            fromAccount: account
          });
        } else {
          return reject('error!');
        }
      });
    });
  }

  createEscrow(price, sellerAddress, buyerAddress): Observable<any> {
    let escrow;
    return Observable.create(observer => {
      this.Escrow.deployed().then(instance => {
        escrow = instance;
        console.log(escrow);
        return escrow.createEscrow(sellerAddress, price, {
          from: buyerAddress,
          value: window.web3.toWei(price)
        });
        // return escrow.depositBean({from: buyerAddress, value: price});
        // return escrow.allEscrows.call("0x566853d0671032660d6120a2dc0dd84b045f58124c7d514c311ea9bfb77d1b6c",{from:buyerAddress});
        // return this.web3.eth.getBalance("0xB56A56A107d4AD0C53841d42c1e0456778aa1bA6")
      }).then(value => {
        console.log(value);
        observer.next(value);
        observer.complete();
      })
      .catch(e => {
        console.log(e);
        observer.error(e);
      });
    });
  }
  sellerVoteEscrow(_exchangeHash, sellerAddress): Observable<any> {
    let escrow;
    return Observable.create(observer => {
      this.Escrow.deployed().then(instance => {
        escrow = instance;
        console.log(escrow);
        return escrow.sellerRequest(_exchangeHash, {
          from: sellerAddress
        });
        // return escrow.depositBean({from: buyerAddress, value: price});
        // return escrow.allEscrows.call("0x3773682ecacbb11b3b3ff73543f15b10290319db37243b2323a031d5f702a7c7" ,{from:sellerAddress});
        // return this.web3.eth.getBalance("0xB56A56A107d4AD0C53841d42c1e0456778aa1bA6")
      }).then(value => {
        console.log(value);
        observer.next(value);
        observer.complete();
      })
      .catch(e => {
        console.log(e);
        observer.error(e);
      });
    });
  }
  buyerVoteEscrow(_exchangeHash, buyerAddress): Observable<any> {
    let escrow;
    return Observable.create(observer => {
      this.Escrow.deployed().then(instance => {
        escrow = instance;
        console.log(escrow);
        console.log(_exchangeHash);
        return escrow.buyerSatisfied(_exchangeHash, {
          from: buyerAddress
        });
        // return escrow.depositBean({from: buyerAddress, value: price});
        // return escrow.allEscrows.call(_exchangeHash, {from: buyerAddress});
        // return this.web3.eth.getBalance("0xB56A56A107d4AD0C53841d42c1e0456778aa1bA6")
      }).then(value => {
        console.log(value);
        observer.next(value);
        observer.complete();
      })
      .catch(e => {
        console.log(e);
        observer.error(e);
      });
    });
  }
  favorBuyerEscrow(_exchangeHash, admin): Observable<any> {
    let escrow;
    return Observable.create(observer => {
      this.Escrow.deployed().then(instance => {
        escrow = instance;
        console.log(escrow);
        console.log(_exchangeHash);
        return escrow.ownerResolveFavorBuyer(_exchangeHash, {
          from: admin
        });
        // return escrow.depositBean({from: buyerAddress, value: price});
        // return escrow.allEscrows.call(_exchangeHash, {from: buyerAddress});
        // return this.web3.eth.getBalance("0xB56A56A107d4AD0C53841d42c1e0456778aa1bA6")
      }).then(value => {
        console.log(value);
        observer.next(value);
        observer.complete();
      })
      .catch(e => {
        console.log(e);
        observer.error(e);
      });
    });
  }
  favorSellerEscrow(_exchangeHash, admin): Observable<any> {
    let escrow;
    return Observable.create(observer => {
      this.Escrow.deployed().then(instance => {
        escrow = instance;
        console.log(escrow);
        console.log(_exchangeHash);
        return escrow.ownerResolveFavorSeller(_exchangeHash, {
          from: admin
        });
        // return escrow.depositBean({from: buyerAddress, value: price});
        // return escrow.allEscrows.call(_exchangeHash, {from: buyerAddress});
        // return this.web3.eth.getBalance("0xB56A56A107d4AD0C53841d42c1e0456778aa1bA6")
      }).then(value => {
        console.log(value);
        observer.next(value);
        observer.complete();
      })
      .catch(e => {
        console.log(e);
        observer.error(e);
      });
    });
  }
}
