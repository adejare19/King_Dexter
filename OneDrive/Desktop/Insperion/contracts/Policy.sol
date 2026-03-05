// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zama-ai/fhevm/TFHE.sol";

contract Policy {
    euint64 public encMaxLTV;
    euint64 public encMinScore;
    euint64 public encLiqThreshold;
    euint64 public encAprBps;

    constructor() {
        encMaxLTV = TFHE.asEuint64(7500);
        encMinScore = TFHE.asEuint64(500);
        encLiqThreshold = TFHE.asEuint64(9000);
        encAprBps = TFHE.asEuint64(800);
    }

    function setParams(
        euint64 _maxLTV,
        euint64 _minScore,
        euint64 _liqThreshold,
        euint64 _aprBps
    ) external {
        encMaxLTV = _maxLTV;
        encMinScore = _minScore;
        encLiqThreshold = _liqThreshold;
        encAprBps = _aprBps;
    }
}
