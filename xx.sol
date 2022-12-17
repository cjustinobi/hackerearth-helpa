// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Helpa {

    address payable public owner;

    struct Vendor {
        address payable vendor;
        string service;
    }

    struct Transaction {
        address payable vendor;
        address payable customer;
        uint256 amount;
        bool completed;
    }

    Vendor[] public vendors;
    Transaction[] public transactions;

    function createTransaction (address payable customer, address payable vendor, uint256 amount, bool completed) public payable {
        transactions.push(Transaction(vendor, customer, amount, completed));

    }

    function getTransactions (uint256 _index) public view returns (address vendor, address customer, uint256 amount, bool completed) {

        Transaction storage transaction = transactions[_index];
        return (
        transaction.vendor,
        transaction.customer,
        transaction.amount,
        transaction.completed
        );
    }

    function updateTransaction(uint256 _index, bool val) public {

        require(val == true, "Transanction can only be marked completed");

        Transaction storage transaction = transactions[_index];
        require(transaction.completed == false, "Transaction has been completed already");


        bool res;

        res = transfer(transaction.vendor, transaction.amount);
        if(res) {
            transaction.completed = val;
        }

    }


    // Function to transfer Ether from this contract to address from input
    function transfer(address payable _to, uint256 _amount) public returns (bool) {
        // Note that "to" is declared as payable
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed to send Ether");
        return success;
    }


    function getBal() public view returns (uint) {
        return address(this).balance;
        //    return 2;
    }

    function transactionCount() public view returns (uint256) {
        return transactions.length;
    }
}


// owner 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

// customer 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0xdD870fA1b7C4700F2BD7f44238821C26f7392148

// Vendor 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// 0x583031D1113aD414F02576BD6afaBfb302140225