import { Relayer } from "@zama-ai/relayer-sdk";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const relayer = new Relayer("https://relayer.fhevm.dev");
const provider = new ethers.JsonRpcProvider("https://devnet.zama.ai");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const registry = new ethers.Contract(process.env.REGISTRY_ADDR, ["function updateScore(address, euint64)"], wallet);

async function updateUserScore(user, delta) {
  const encDelta = await relayer.encrypt64(delta);
  const tx = await registry.updateScore(user, encDelta);
  console.log("Score updated:", tx.hash);
}

updateUserScore("0xUserAddressHere", 20);
