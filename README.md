![Logo of the project](https://i.imgur.com/rI8wDQs.jpg)

# PROPOSED LEVEL OF ACHIEVEMENT
GEMINI

# Target Audience/Group: 
Online Shoppers in Consumer 2 Consumer Marketplace

# Aim 
1. Elimination of Intermediaries -> Reduce Cost
2. Ensure secure payments in C2C Marketplace.

# BEANS MARKETPLACE
>C2C marketplace where payments and escrow service are handled by a Smart Contract.

## Motivation

For C2C marketplace like carousell, what makes it attractive is that there is minimal costs involved with the lack of retailers and wholesalers, keeping the margins higher for sellers and prices lower for buyers. 
There is also the convenience factor — instead of trying to sell items in person at a brick-and-mortar store, consumers can simply list their products online and wait for the buyers to come to them. Buyers don't need to drive around and search through stores for an item they want — they just have to search for it on a C2C site. 
However, in such a marketplace, trust is placed on both parties to ensure that they deliver on their end. I.e. for the buyer of the product, they make their payment and for the seller of the product, they deliver their product. However, in Singapore, countless people have fallen to scams on these C2C platforms. The buyer transfers the payment to the seller, but the seller never delivers the product and disappears. Thereafter, the buyer is left high and dry.

It is in the light of this, we can tap on the beauty of Smart Contracts.

Smart contracts are pieces of code that can be deployed onto the Ethereum Blockchain and be there forever. 
Once deployed, no one can maintain control over it. It is immutable and removes the possibility of any malicious manipulation.
Every party interacts with the same contract that contains an agreed upon set of rules in the form of code.


## How it works

The money is held entirely in the contract. At no point in time during the trade the admin is able to touch your money. The only time we can choose to direct the money is when we are called to resolve the dispute.
This means that the smart contract allows both parties to safely exchange money with one another, and if need be, name a trusted third-party to resolve a dispute. 
As of now, the trusted 3rd party is us, but ideally we would like it to be anyone from a community - Where people choose a mediator from the community based on a rating-based system.
How this can be implemented is we implement our own cryptocurrency.
Mediators are incentivised to resolve a dispute well if we reward them with cryptocurrency.


Similar to online marketplaces, the seller uploads an item along with other details like image, price, description.
After uploading, the item will be listed on the home page until it is sold.

The buyer views the item on the home page and makes a purchase request by clicking on the button. 

The button initiates a buy request and this does 2 things:
1. creates a listing on the contract. 
2. The buyer deposits the money in the contract.

The seller is able to see that there is a buy request on the item. The seller sends the product and clicks on the button.
The button does 1 thing:
1. Updates the listing on the contract and gives it 1 vote.

Thereafter, when the buyer receives the product, he clicks on a button, this does 2 things:
1. Updates the listing on the contract and gives it 1 vote.
2. Since the vote has reached majority i.e. 2:3, the payment is processed and the contract transfers the money to the seller.

In the event where there is a dispute between the buyer and seller 
-> E.G. buyer unhappy with product/buyer doesnt receive product
He can choose to contact the middleman. The middleman in this project will be defaulted as the deployer of the contract -> us.
To resolve the dispute between the buyer & seller, the middleman will make one of 2 decisions. 
Middleman can choose to : 
1. Rule in favor of buyer
2. Rule in favor of seller

In the case of (1) : Middleman will press a button and it'll do 2 things:
1. Update the listing on the Smart Contract to indicate the issue has been resolved.
2. Refund the buyer his money.

In the case of (2) : Middleman will press a button and it'll do 2 things:
1. 1. Update the listing on the Smart Contract to indicate the issue has been resolved and gives it 1 vote.
2. Since the vote has reached majority i.e. 2:3, the payment is proccessed and the money is transferred to the seller.

## Installing / Getting started

A quick introduction of the minimal setup you need to get it up &
running.

```shell
git clone https://github.com/your/awesome-project.git
npm install
npm install -g @angular/cli
truffle compile && truffle migrate
ng serve
```


## Features

* As a non-registered user, I want to 
  * Register an account
  * Allowed to view listings without registering account.
  * Unable to upload listing.
  * Unable to view other pages except the signup/login and listings page.

* As a Seller, I want to 
  * upload a listing(inclusive of picture and product description)
  * preview image before it is uploading.
  * receive payment.

* As a buyer, I want to 
  * browse through listings 
  * Search Bar Filter Features(Price, Category, Seller’s Rating)
  * Make payment securely

* As an admin/third-party I want to 
  * Browse through listings
  * Resolve the dispute -> In favor of buyer or In favor of Seller


## Technology Stack
* Angular
* Firebase
* Metamask
* Web3
* Solidity


## Links

