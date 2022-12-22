// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Helpa {

  uint256 public vendorCount;

  enum Status {
    Cancelled,
    InProgress,
    Reviewing,
    Completed
  }

  struct Vendor {
    address payable vendorAddress;
    string businessName;
    string profession;
    string UDName;
    string imgUrl;
    string description;
    uint256 price;
    uint256 totalAmount;
    uint256 transactionCount;
  }

  struct Transaction {
    uint256 vendorIndex;
    address payable vendor;
    address payable customer;
    uint256 amount;
    Status status;
    uint256 dateCreated;
    uint256 dateCompleted;
    uint256 dateReviewing;
  }

  mapping (address => uint256) transactionCounts;

  mapping (address => Transaction[]) transactions;

  //  mapping (address => TransactionStat) transactionStat;

  mapping (uint256 => Vendor) vendors;

  mapping(address => bool) public vendorExists;

  function createVendor(
    string memory _businessName,
    string memory _profession,
    string memory _UDName,
    string memory _imgUrl,
    string memory _description,
    uint256 _price
  ) public {

    require(vendorExists[msg.sender] == false, 'Vendor already exists');

    uint256 totalAmount;
    uint256 transactionCount;

    Vendor storage vendor = vendors[vendorCount];

    vendor.vendorAddress = payable(msg.sender);
    vendor.businessName = _businessName;
    vendor.profession = _profession;
    vendor.UDName = _UDName;
    vendor.imgUrl = _imgUrl;
    vendor.description = _description;
    vendor.price = _price;
    vendor.totalAmount = totalAmount;
    vendor.transactionCount = transactionCount;

    vendorExists[msg.sender] = true;

    vendorCount ++;
  }

  function createTransaction (
    uint256 vendorIndex,
    address payable vendor

  ) public payable {

    Status status = Status.InProgress;
    transactions[msg.sender].push(Transaction(vendorIndex, vendor, payable(msg.sender), msg.value, status, block.timestamp, 0, 0));
    transactionCounts[msg.sender] += 1;
  }

  function serviceReviewing(uint256 _index) public {
    Transaction storage transaction = transactions[msg.sender][_index];
    require(transaction.vendor == msg.sender, "Only the Vendor can confirm service completed");
    require(transaction.status != Status.Completed, "Only the Customer can confirm service completed");

    transaction.status = Status.Reviewing;
    transaction.dateReviewing = block.timestamp;
  }

  function confirmService(uint256 _index) public {

     Transaction storage transaction = transactions[msg.sender][_index];

//    require(transaction.customer == msg.sender, "Only the customer can confirm the service");
//    require(transaction.status == Status.Completed, "Transaction has been completed already");


      bool res;

      res = transfer(transaction.vendor, transaction.amount);

      if(res) {

        transaction.status = Status.Completed;
        transaction.dateCompleted = block.timestamp;

        Vendor storage vendor = vendors[transaction.vendorIndex];
        vendor.totalAmount += transaction.amount;
        vendor.transactionCount ++;
      }

  }

  // Function to transfer Ether from this contract to address from input

  function transfer(address payable _to, uint256 _amount) public returns (bool) {

    (bool success, ) = _to.call{value: _amount}("");
    require(success, "Failed to send Ether");
    return success;
  }


  function getBal() public view returns (uint256) {

    return address(this).balance;
  }

  function getVendors(uint256 _index) public view returns (
    address vendorAddress,
    string memory businessName,
    string memory UDName,
    string memory imgUrl,
    string memory description,
    string memory profession,
    uint256 price,
    uint256 totalAmount,
    uint256 transCount
  ) {

    Vendor storage vendor = vendors[_index];

    return (
    vendor.vendorAddress,
    vendor.businessName,
    vendor.UDName,
    vendor.imgUrl,
    vendor.description,
    vendor.profession,
    vendor.price,
    vendor.totalAmount,
    vendor.transactionCount
    );
  }

  function getTransactions (uint256 _index) public view returns (
    uint256 transactionIndex,
    uint256 vendorIndex,
    address vendor,
    address customer,
    uint256 amount,
    Status status,
    uint256 dateCreated,
    uint256 dateCompleted,
    uint256 dateReviewing
  ) {

    Transaction storage transaction = transactions[msg.sender][_index];

    return (
    _index,
    transaction.vendorIndex,
    transaction.vendor,
    transaction.customer,
    transaction.amount,
    transaction.status,
    transaction.dateCreated,
    transaction.dateCompleted,
    transaction.dateReviewing
    );
  }

  //  function getTransactionStats () public view returns (uint256 amount, uint256 count) {
  //
  //    TransactionStat storage stat = transactionStat[msg.sender];
  //
  //    return (
  //      stat.amount,
  //      stat.count
  //    );
  //  }

  function getTransactionCount() public view returns (uint256) {
    return transactionCounts[msg.sender];
  }

  function getVendorCount() public view returns (uint256) {
    return vendorCount;
  }
}


// owner 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

// customer 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0xdD870fA1b7C4700F2BD7f44238821C26f7392148

// Vendor 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// 0x583031D1113aD414F02576BD6afaBfb302140225


// firefox   0x01a3f5cB1BCf260d12A2466cE075398aAB8cA610