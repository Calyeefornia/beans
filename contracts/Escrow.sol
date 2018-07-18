pragma solidity ^0.4.24;

contract Escrow {

    address public owner;
    mapping(bytes32 => EscrowDetails) public allEscrows;

    event EscrowCreated(bytes32 _exchangeHash);

    struct EscrowDetails {
        bool exists;
        address buyer; //Stores address of buyer
        address seller; //Stores address of Seller
        address escrowParty; //Stores address of middleman -> Creator of contract
        uint amount; //Stores amount of the item to be sold
        bool buyerHappy; //Determines if buyer is happy
        bool sellerRequest; //Determines if seller is happy
        bool escrowHappy; //Middlemen steps in to resolve if both parties conflict.
    }
    constructor () public {
        owner = msg.sender;
    }
    modifier onlyBuyer(bytes32 exchangeHash) {
        require (allEscrows[exchangeHash].buyer == msg.sender);
        _;
    }
    modifier onlySeller(bytes32 exchangeHash) {
        require (allEscrows[exchangeHash].seller == msg.sender);
        _;
    }
    modifier onlyOwner(bytes32 exchangeHash) {
        require (allEscrows[exchangeHash].escrowParty == owner);
        _;
    }

    function depositBean() public payable{}

    function checkBean() public view returns(uint){
        return address(this).balance;
    }

    function createEscrow(address sellerAddress, uint amount) public payable returns (bool){
        require(msg.value > 0);

        //creates a unique hash comprising of the buyer, seller and the amt to store the escrow
        bytes32 exchangeHash = keccak256(msg.sender, sellerAddress, amount);
        require(!allEscrows[exchangeHash].exists);

        //initializes the info to be stored on allEscrows
        EscrowDetails memory newEscrow;

        newEscrow.buyer = msg.sender;
        newEscrow.seller = sellerAddress;
        newEscrow.escrowParty = owner;
        newEscrow.amount = amount;
        newEscrow.buyerHappy = false;
        newEscrow.sellerRequest = false;
        newEscrow.escrowHappy = false;

        allEscrows[exchangeHash] = newEscrow;
        emit EscrowCreated(exchangeHash); //Alerts that the escrow has been created and the corresponding address of it.
    }

    function sellerRequest(bytes32 exchangeHash) public onlySeller(exchangeHash){
        EscrowDetails storage escrowRef = allEscrows[exchangeHash];
        escrowRef.sellerRequest = true;
    }

    function buyerSatisfied(bytes32 exchangeHash) public onlyBuyer(exchangeHash){
        EscrowDetails storage escrowRef = allEscrows[exchangeHash];
        require(escrowRef.sellerRequest == true);
        escrowRef.buyerHappy = true;
        completePayment(exchangeHash);
    }

    function ownerResolve(bytes32 exchangeHash) public onlyOwner(exchangeHash){
        EscrowDetails storage escrowRef = allEscrows[exchangeHash];
        escrowRef.escrowHappy = true;
        completePayment(exchangeHash);
    }

    function completePayment(bytes32 exchangeHash) private {
        EscrowDetails memory escrowRef = allEscrows[exchangeHash];
        address seller = escrowRef.seller;
        uint amt = escrowRef.amount;
        seller.transfer(amt);
    }
}
