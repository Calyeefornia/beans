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
          value: price
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
      })
    });
  }

  // createEscrow(_transferFrom) {
  //   const that = this;
  //   return new Promise((resolve, reject) => {
  //     const escrowContract = TruffleContract(tokenABI);
  //     escrowContract.setProvider(that.web3Provider);
  //     escrowContract
  //       .deployed()
  //       .then(function(instance) {
  //         console.log('deplyoed');
  //         return instance.transferFund(_transferTo, {
  //           from: _transferFrom,
  //           value: window.utils.web3.toWei(_amount, 'ether')
  //         });
  //       })
  //       .then(function(status) {
  //         if (status) {
  //           return resolve({ status: true });
  //         }
  //       })
  //       .catch(function(err) {
  //         console.log(err);
  //         return reject('error in transfer');
  //       });
  //   });
  // }
}
