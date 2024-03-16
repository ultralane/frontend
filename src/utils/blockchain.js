import { BrowserProvider, Contract } from "ethers";
import { USDC_ABI, Pool_ABI, Depth } from "./constants";
import { Networks } from "./constants";
import { db } from "./db";
import { NoteMerkleTree } from "@ultralane/sdk";

export const USDC = async () => {
  let provider = new BrowserProvider(window.ethereum);
  let signer = await provider.getSigner();
  let chainId = (await provider.getNetwork()).chainId;
  let usdc = Networks[chainId].usdc_address;
  let contract = new Contract(usdc, USDC_ABI, signer);
  return contract;
};

export const Pool = async () => {
  let provider = new BrowserProvider(window.ethereum);
  let signer = await provider.getSigner();
  let chainId = (await provider.getNetwork()).chainId;
  let pool = Networks[chainId].pool_address;
  let contract = new Contract(pool, Pool_ABI, signer);
  return contract;
};

export const getTree = async () => {
  // Get all the elements of the merkle tree
  let elements = (await db.getAll("elements")).map((d) => {
    return d.value;
  });
  return NoteMerkleTree.fromJson({
    elements,
    depth: Depth,
  });
};

// Function to fetch transfer events
export const fetchTransferEvents = async (startBlock, endBlock, addresses) => {
  const tokenContract = await USDC();
  for (let address of addresses) {
    const transferEvents = await tokenContract.queryFilter(
      tokenContract.filters.Transfer(address, null), // From this address
      startBlock,
      endBlock
    );

    // You can also check transfers to the address by swapping the parameters
    // tokenContract.filters.Transfer(null, address), // To this address

    console.log(`Transfer events for ${address}: `, transferEvents);
  }
};
