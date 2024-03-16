export const APP_NAME = `Ultralane`;
export const Depth = 16;
export const INIT_CODE_HASH =
  "0x8ef41c02d84907eba00830bf248d119ab5a737b8977d1f8a7268194e19b7b627";

export const Networks = {
  // 31337: {
  //   name: "Hardhat",
  //   usdc_address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  //   pool_address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  //   rpc_url: "http://localhost:8545",
  //   startBlock: 5,
  // },
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
