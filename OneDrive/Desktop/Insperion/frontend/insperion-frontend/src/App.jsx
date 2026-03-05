import { useState } from "react";
import { ethers } from "ethers";
import { encryptValue } from "./utils/fhe";

const registryAddress = "0xYourCreditRegistryAddress"; // replace after deploy
const registryABI = [
  "function depositCollateral(uint64 encAmount)",
  "function isEligible(address user) view returns (bool)"
];

export default function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState("");
  const [eligible, setEligible] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask first!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);

    const c = new ethers.Contract(registryAddress, registryABI, signer);
    setContract(c);
  }

  async function deposit() {
    if (!contract) return alert("Connect first");
    const enc = await encryptValue(Number(amount));
    const tx = await contract.depositCollateral(enc);
    await tx.wait();
    alert("Encrypted deposit successful!");
  }

  async function checkEligibility() {
    if (!contract) return alert("Connect first");
    const result = await contract.isEligible(account);
    setEligible(result);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">AnonCredit (Zama FHEVM)</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-indigo-600 px-4 py-2 rounded-lg"
        >
          Connect Wallet
        </button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <input
        type="number"
        placeholder="Deposit collateral"
        className="p-2 text-black rounded"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={deposit}
        className="bg-green-600 px-4 py-2 rounded-lg mt-2"
      >
        Deposit
      </button>

      <button
        onClick={checkEligibility}
        className="bg-yellow-600 px-4 py-2 rounded-lg mt-2"
      >
        Check Eligibility
      </button>

      {eligible !== null && (
        <p className="mt-3">
          Eligibility:{" "}
          <span className={eligible ? "text-green-400" : "text-red-400"}>
            {eligible ? "Eligible ✅" : "Not Eligible ❌"}
          </span>
        </p>
      )}
    </div>
  );
}
