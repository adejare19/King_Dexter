// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zama-ai/fhevm/TFHE.sol";
import "./CreditRegistry.sol";
import "./Policy.sol";

contract LoanVault {
    CreditRegistry public registry;
    Policy public policy;

    constructor(address _registry, address _policy) {
        registry = CreditRegistry(_registry);
        policy = Policy(_policy);
    }

    function borrow(euint64 encAmount) external {
        // Borrow logic placeholder — add interest calc in phase 2
        registry.updateScore(msg.sender, TFHE.asEuint64(10)); // reward borrower for interaction
    }

    function repay(euint64 encAmount) external {
        // Homomorphic repayment updates will go here
    }
}
