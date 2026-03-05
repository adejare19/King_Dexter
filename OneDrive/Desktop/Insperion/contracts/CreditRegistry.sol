// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zama-ai/fhevm/TFHE.sol";
import "./Policy.sol";

contract CreditRegistry {
    struct Account {
        euint64 encCollateral;
        euint64 encDebt;
        euint64 encScore;
    }

    mapping(address => Account) public accounts;
    Policy public policy;

    constructor(address _policy) {
        policy = Policy(_policy);
    }

    function depositCollateral(euint64 encAmount) external {
        Account storage a = accounts[msg.sender];
        a.encCollateral = TFHE.add(a.encCollateral, encAmount);
    }

    function updateScore(address user, euint64 encDelta) external {
        Account storage a = accounts[user];
        a.encScore = TFHE.add(a.encScore, encDelta);
    }

    function isEligible(address user) external view returns (bool) {
        Account storage a = accounts[user];
        ebool okScore = TFHE.ge(a.encScore, policy.encMinScore());
        bool result = TFHE.reveal(okScore);
        return result;
    }
}
