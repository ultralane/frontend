import { useState } from "react";
import Modal from "./ui/modal";
import Button from "./ui/button";
import classNames from "../utils/className";
// import { api } from "../utils/api";
import { KeyPair } from "@ultralane/sdk";
import * as sdk from "@ultralane/sdk";
import { USDC, Pool, getTree } from "../utils/blockchain";
import { parseUnits } from "ethers";
import { db } from "../utils/db";
import { useEffect } from "react";
import { Networks } from "../utils/constants";
import Loading from "./Loading";
import loadingAnimation from "../assets/loading.json";
import successAnimation from "../assets/success.json";
import errorAnimation from "../assets/error.json";
import { getNetwork } from "../utils/blockchain";

function BalanceCard({ updateBody }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState(0); // Step 1: Define the state variable for amount
  const [balance, setBalance] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let getBalance = async () => {
      let balance = await localStorage.getItem("balance");
      if (!balance) {
        balance = 0;
      }
      setBalance(balance);
    };
    let selectNetwork = async () => {
      let chainId = parseInt(
        await window.ethereum.request({ method: "eth_chainId" })
      ).toString();
      setSelectedNetwork(chainId);
    };
    getBalance();
    selectNetwork();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLoading(false);
    setError(false);
    setSuccess(false);
  };

  const handleNetworkChange = (event) => {
    // switch network to selected network
    let chainId = event.target.value;
    // convert chain to hex
    let hexChainId = "0x" + parseInt(chainId).toString(16);
    window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: hexChainId,
        },
      ],
    });
    setSelectedNetwork(event.target.value);
  };

  const handleAmountChange = (event) => {
    // Step 2: Define the event handler
    setAmount(event.target.value);
  };

  const deposit = async () => {
    if (!selectedNetwork) {
      alert("Please select a network");
      return;
    }
    setLoading(true);
    try {
      const depositAmount = parseUnits(amount, 6);

      const tree = await getTree();
      // Create a note
      const keypair = await KeyPair.random();
      setStatus("Creating transaction...");
      const tx = await tree.createTransaction({
        inputNotes: [],
        keypair,
        updateTree: true,
        depositAmount,
      });
      setStatus("Generating zk proof...");
      const { proof, publicInputs } = await sdk.logtime(tx.prove());
      const updatedDepositRoot = await tree.calculateRootHex();

      const usdc = await USDC();
      const pool = await Pool();

      setStatus("Approving deposit...");
      console.log(depositAmount.toString());
      // Deposit usdc to the pool along with the note
      let usdc_tx = await usdc.approve(pool, depositAmount);
      await usdc_tx.wait();
      console.log("usdc approved");
      setStatus("Depositing to pool...");
      let deposit_tx = await pool.transact(proof, publicInputs, {
        gasLimit: 20000000,
      });
      await deposit_tx.wait();
      console.log("deposit tx", deposit_tx);

      window.keypair = keypair;
      window.tx = tx;
      window.proof = proof;
      window.publicInputs = publicInputs;

      // store the new commitment in the local db
      db.add("notes", tx.outputs[0].raw());
      console.log("note added to db", await tx.outputs[0].commitmentHex());
      let network = await getNetwork();
      let txStore = {
        txHash: deposit_tx.hash,
        chain: network.name,
        source: "Deposit",
        status: "Success",
        time: new Date().toLocaleString(),
        amount,
      };

      db.add("transactions", txStore);
      updateBody(txStore);
      setStatus(`Success`);

      let amount_int = typeof amount === "string" ? parseInt(amount) : amount;
      let balance_int =
        typeof balance === "string" ? parseInt(balance) : balance;
      localStorage.setItem("balance", balance_int + amount_int);
      setBalance(balance_int + amount_int);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      let e = "Error";
      if (error.message.includes("429")) {
        e = "Too many requests";
      }
      console.log(error.message);
      setStatus(e);
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const closeLoaderModal = () => {
    setLoading(false);
    setError(false);
    setSuccess(false);
  };

  return (
    <>
      <div className='bg-[#121024] flex w-[270px] gap-8 rounded-md px-5 py-7 justify-between'>
        <h3 className='font-medium text-2xl'>
          {balance} <br /> USDC
        </h3>
        <div className='flex flex-col gap-4'>
          <button
            className='p-1 text-[.8rem] bg-none border-2 rounded-md'
            onClick={openModal}
          >
            DEPOSIT
          </button>
          <button className='p-1 text-[.8rem] bg-none border-2 rounded-md'>
            WITHDRAW
          </button>
        </div>
      </div>
      {modalOpen && (
        <Modal closeModal={closeModal} className={classNames(`w-[24rem]`)}>
          {loading && (
            <Loading
              animation={loadingAnimation}
              status={status}
              closeLoaderModal={closeLoaderModal}
              loop={true}
            />
          )}
          {success && (
            <Loading
              animation={successAnimation}
              status={status}
              closeLoaderModal={closeLoaderModal}
            />
          )}
          {error && (
            <Loading
              animation={errorAnimation}
              status={status}
              closeLoaderModal={closeLoaderModal}
            />
          )}
          {!error && !loading && !success && (
            <>
              <div className='py-20 px-12 card-gradient-2'>
                <h2 className='font-medium text-center text-2xl text-white'>
                  Deposit to Ultralane
                </h2>
                <div className='w-full flex flex-col gap-8'>
                  <div className='flex flex-col mt-10 gap-2'>
                    <label htmlFor='network'>Network</label>
                    <select
                      id='network'
                      name='network'
                      value={selectedNetwork}
                      onChange={handleNetworkChange}
                      className='px-2 py-1 border border-opacity-20 border-white bg-transparent rounded-lg text-white'
                    >
                      <option value='' disabled>
                        Select Network
                      </option>
                      {Object.keys(Networks).map((network) => (
                        <option key={network} value={network}>
                          {Networks[network].name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='amount'>Amount</label>
                    <input
                      type='text'
                      id='amount'
                      name='amount'
                      placeholder='Enter amount'
                      className='px-2 py-1 border border-opacity-20 border-white bg-transparent rounded-lg'
                      value={amount} // Bind input value to the state variable
                      onChange={handleAmountChange} // Update state on input change
                    />
                  </div>
                  <Button
                    className={`w-full py-2 px-4 rounded-xl`}
                    onClick={deposit}
                  >
                    Deposit
                  </Button>
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default BalanceCard;
