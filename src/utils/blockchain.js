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
  pool = await pool.attach("0x4173058ff62d69814c83ca154294BbD7c9B8A87B");
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
  let provider = tokenContract.runner.provider;
  // startBlock = 23941031; // TODO: remove this line
  let endBlock = await provider.getBlockNumber();
  let events = [];
  console.log("Fetching transfer events");
  for (let address of addresses) {
    const transferEvents = await tokenContract.queryFilter(
      tokenContract.filters.Transfer(null, address), // From this address
      startBlock,
      endBlock
    );
    events = events.concat(transferEvents);
  }
  return [endBlock, events];
};

export const getNetwork = async () => {
  let provider = new BrowserProvider(window.ethereum);
  let chainId = (await provider.getNetwork()).chainId.toString();
  return { ...Networks[chainId], chainId };
};
