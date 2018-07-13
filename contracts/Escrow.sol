pragma solidity ^0.4.24;

contract BeansEscrow {

    address public owner;
    mapping(bytes32 => EscrowDetails) public allEscrows;

    struct EscrowDetails {
        address buyer; //Stores address of buyer
        address seller; //Stores address of Seller
        address escrowParty; //Stores address of middleman -> Creator of contract
        uint amount; //Stores amount of the item to be sold
        bool buyerHappy; //Determines if buyer is happy
        bool sellerHappy; //Determines if seller is happy
        bool escrowHappy; //Middlemen steps in to resolve if both parties conflict.
    }
    constructor () public {
        owner = msg.sender;
    }

    function depositBean() public payable{}

    function createEscrow(address sellerAddress, uint amount) public payable returns (bool){
        require(msg.value > 0);

        //creates a unique hash comprising of the buyer, seller and the amt to store the escrow
        bytes32 exchangeHash = keccak256(msg.sender, sellerAddress, amount);

        //initializes the info to be stored on allEscrows
        EscrowDetails memory newEscrow;

        newEscrow.buyer = msg.sender;
        newEscrow.seller = sellerAddress;
        newEscrow.escrowParty = owner;
        newEscrow.amount = amount;
        newEscrow.buyerHappy = false;
        newEscrow.sellerHappy = false;
        newEscrow.escrowHappy = false;

        allEscrows[exchangeHash] = newEscrow;

    }

}
