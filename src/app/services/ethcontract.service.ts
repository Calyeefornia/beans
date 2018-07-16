import { Injectable } from '@angular/core';
const Web3 = require('web3');
import * as TruffleContract from 'truffle-contract';

declare let require: any;

declare let window: any;

let tokenABI = require('../../../build/contracts/Escrow.json');

@Injectable()
export class EthcontractService {
  private web3Provider: null;
  private contracts: {};

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      this.web3Provider = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
    window.web3 = new Web3(this.web3Provider);
  }

  createEscrow() {
    console.log('thisworks');
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
        console.log(account);
        if (err === null) {
          Web3.eth.getBalance(account, function(err, balance) {
            if (err === null) {
              return resolve({
                fromAccount: account,
                balance: Web3.fromWei(balance, 'ether')
              });
            }
          });
        }
      });
    });
  }
}
