export const APP_NAME = `Ultralane`;
export const Depth = 16;
export const INIT_CODE_HASH =
  "0x8ef41c02d84907eba00830bf248d119ab5a737b8977d1f8a7268194e19b7b627";

export const Networks = {
  11155420: {
    name: "Optimism Sepolia",
    rpc_url: `https://opt-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
    startBlock: 9409719,
    explorer: "https://sepolia-optimism.etherscan.io/",
  },
  421614: {
    name: "Arbitrum Sepolia",
    rpc_url: `https://arb-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
    startBlock: 23801231,
    explorer: "https://sepolia.arbiscan.io/",
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
  { title: "From", key: "from", type: "hex" },
  { title: "To", key: "to", type: "hex" },
  { title: "Amount", key: "amount" },
  { title: "Tx Hash", key: "txHash", type: "txHash" },
];
