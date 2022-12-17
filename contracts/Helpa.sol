// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Helpa {

  uint256 public vendorCount;

  struct Vendor {
    address payable vendorAddress;
    string businessName;
    string UDName;
    string imgUrl;
    uint256 price;
  }

  struct Transaction {
    address payable vendor;
    address payable customer;
    uint256 amount;
    bool completed;
  }

  struct TransactionStat {
    uint256 amount;
    uint256 count;
  }


  mapping (address => Transaction[]) transactions;

  mapping (address => TransactionStat) transactionStat;

  mapping (uint256 => Vendor) vendors;

  mapping(address => bool) public vendorExists;

//  Vendor[] public vendors;
  //  Transaction[] public transactions;

  function createVendor(string memory _businessName, string memory _UDName, string memory _imgUrl, uint256 _price) public {

    require(vendorExists[msg.sender] == false, 'Vendor already exists');

    Vendor storage vendor = vendors[vendorCount];

    vendor.vendorAddress = payable(msg.sender);
    vendor.businessName = _businessName;
    vendor.UDName = _UDName;
    vendor.imgUrl = _imgUrl;
    vendor.price = _price;

    vendorExists[msg.sender] = true;

    vendorCount ++;
  }

  function createTransaction (address payable customer, address payable vendor, bool completed) public payable {
    transactions[msg.sender].push(Transaction(vendor, customer, msg.value, completed));
  }

  function updateTransaction(uint256 _index, bool val) public {

    require(val == true, "Transaction can only be marked completed");

    Transaction storage transaction = transactions[msg.sender][_index];

    require(transaction.completed == false, "Transaction has been completed already");

    bool res;

    res = transfer(transaction.vendor, transaction.amount);

    if(res) {
      transaction.completed = val;

      TransactionStat storage stat = transactionStat[transaction.vendor];
      stat.amount += transaction.amount;
      stat.count ++;
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
    uint256 price
  ) {

    Vendor storage vendor = vendors[_index];

    return (
    vendor.vendorAddress,
    vendor.businessName,
    vendor.UDName,
    vendor.imgUrl,
    vendor.price
    );
  }

  function getTransactions (uint256 _index) public view returns (
    address vendor,
    address customer,
    uint256 amount,
    bool completed
  ) {

    Transaction storage transaction = transactions[msg.sender][_index];

    return (
    transaction.vendor,
    transaction.customer,
    transaction.amount,
    transaction.completed
    );
  }

  function getTransactionStats (uint256 _index) public view returns (uint256 amount, uint256 count) {

    TransactionStat storage stat = transactionStat[msg.sender];

    return (
      stat.amount,
      stat.count
    );
  }

  function getTransactionCount(uint256 _index) public view returns (uint256) {
      return transactions[msg.sender].length;
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