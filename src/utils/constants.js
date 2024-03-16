export const APP_NAME = `Ultralane`;
export const Depth = 16;

export const USDC_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

export const Pool_ABI = [
  {
    inputs: [
      {
        internalType: "contract SplitJoinVerifier",
        name: "_splitJoinVerifier",
        type: "address",
      },
      {
        internalType: "contract Hash2Verifier",
        name: "_hash2Verifier",
        type: "address",
      },
      {
        internalType: "contract NoteVerifier",
        name: "_noteVerifier",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_usdc",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "Field",
        name: "commitment",
        type: "uint256",
      },
    ],
    name: "NewCommitment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "Field",
        name: "commitment",
        type: "uint256",
      },
    ],
    name: "NullifierSpent",
    type: "event",
  },
  {
    inputs: [],
    name: "INIT_CODE_HASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ZERO_COMMITMENT",
    outputs: [
      {
        internalType: "Field",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ZERO_NULLIFIER",
    outputs: [
      {
        internalType: "Field",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ZERO_ROOT",
    outputs: [
      {
        internalType: "Field",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "Field",
        name: "salt",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "stealthAddressOwnershipZkProof",
        type: "bytes",
      },
      {
        internalType: "Field",
        name: "noteCommitment",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "noteCreationZkProof",
        type: "bytes",
      },
      {
        internalType: "Field",
        name: "newDepositRoot",
        type: "uint256",
      },
    ],
    name: "collect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Field",
        name: "salt",
        type: "uint256",
      },
    ],
    name: "compute",
    outputs: [
      {
        internalType: "address",
        name: "stealthAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "Field",
        name: "noteCommitment",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "proof",
        type: "bytes",
      },
      {
        internalType: "Field",
        name: "newDepositRoot",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositsRoot",
    outputs: [
      {
        internalType: "Field",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hash2Verifier",
    outputs: [
      {
        internalType: "contract Hash2Verifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Field",
        name: "nullifier",
        type: "uint256",
      },
    ],
    name: "isNoteSpent",
    outputs: [
      {
        internalType: "bool",
        name: "isSpent",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "noteCommitments",
    outputs: [
      {
        internalType: "Field",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "noteVerifier",
    outputs: [
      {
        internalType: "contract NoteVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Field",
        name: "newDepositsRoot",
        type: "uint256",
      },
    ],
    name: "setDepositsRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "splitJoinVerifier",
    outputs: [
      {
        internalType: "contract SplitJoinVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "proof",
        type: "bytes",
      },
      {
        internalType: "Field[]",
        name: "publicInputs",
        type: "uint256[]",
      },
      {
        internalType: "Field",
        name: "newDepositRoot",
        type: "uint256",
      },
    ],
    name: "transact",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdc",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const Networks = {
  31337: {
    name: "Hardhat",
    usdc_address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    pool_address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    rpc_url: "http://localhost:8545",
    startBlock: 5,
  },
  11155111: {
    name: "Sepolia",
    usdc_address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    pool_address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    rpc_url: "https://1rpc.io/sepolia	",
    startBlock: 5498346,
  },
  421614: {
    name: "Arbitrum Sepolia",
    usdc_address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    pool_address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    rpc_url: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
    startBlock: 23801231,
  },
};

export const heading1 = [
  { title: "Tx Hash", key: "txHash", type: "hex" },
  { title: "Chain", key: "chain" },
  { title: "Source", key: "source" },
  { title: "Status", key: "status" },
  { title: "Time", key: "time" },
  { title: "Amount", key: "amount" },
];

export const heading2 = [
  { title: "Address", key: "address" },
  { title: "Created", key: "created" },
  { title: "Amount", key: "amount" },
];
