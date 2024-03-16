import { BrowserProvider } from "ethers";
import { Depth } from "./constants";
import { Networks } from "./constants";
import { NoteMerkleTree, getContracts } from "@ultralane/sdk";

export const USDC = async () => {
  let provider = new BrowserProvider(window.ethereum);
  let signer = await provider.getSigner();
  let { usdc } = await getContracts(signer);
  return usdc;
};

export const Pool = async () => {
  let provider = new BrowserProvider(window.ethereum);
  let signer = await provider.getSigner();
  let { pool } = await getContracts(signer);
  return pool;
};

export const getTree = async () => {
  // Get all the elements of the merkle tree
  const pool = await Pool();
  let elements = await pool.allNoteCommitments();
  return NoteMerkleTree.fromAllNoteCommitments(elements, Depth);
};

// Function to fetch transfer events
export const fetchTransferEvents = async (startBlock, addresses) => {
  // fetch latest block
  const tokenContract = await USDC();
  startBlock = 5498630;
  let provider = tokenContract.runner.provider;
  let endBlock = await provider.getBlockNumber();
  let events = [];
  console.log("Fetching transfer events");
  for (let address of addresses) {
    console.log(address, await tokenContract.getAddress());
    const transferEvents = await tokenContract.queryFilter(
      tokenContract.filters.Transfer(null, address), // From this address
      startBlock,
      endBlock
    );
    console.log("asdf", transferEvents);

    // You can also check transfers to the address by swapping the parameters
    // tokenContract.filters.Transfer(null, address), // To this address
  }
  return [endBlock, events];
};

export const getNetwork = async () => {
  let provider = new BrowserProvider(window.ethereum);
  let chainId = (await provider.getNetwork()).chainId.toString();
  return { ...Networks[chainId], chainId };
};
