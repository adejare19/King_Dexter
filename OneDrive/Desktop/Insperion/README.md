# Insperion (Zama Protocol Build)

Fully Homomorphic Encrypted credit protocol built on Zama’s FHEVM.

### Key Features
- Encrypted collateral, debt, and scores
- Eligibility & liquidation checks using FHE comparisons
- End-to-end encryption using Relayer SDK
- Scoring oracle updates via encrypted transactions

### Tech Stack
- Solidity + Zama FHEVM SDK
- Relayer SDK (frontend + oracle)
- React (Vite + Tailwind)
- Hardhat + TypeScript tests

### Run locally
```bash
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network fhevmDev
