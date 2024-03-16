import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/Sidebar";
import Button from "../components/ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import successAnimation from "../assets/success.json";
import loadingAnimation from "../assets/loading.json";
import errorAnimation from "../assets/error.json";
import { useState } from "react";
import Loading from "../components/Loading";
import { Networks } from "../utils/constants";
import { getTree } from "../utils/blockchain";
import { db } from "../utils/db";
import { Note, Field, KeyPair } from "@ultralane/sdk";
import { useEffect } from "react";
import { parseUnits } from "ethers";
import Close from "../components/Icons/Close";

function Send() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(""); // Added state for selected network
  const [amount, setAmount] = useState(10); // Initial amount
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    let selectNetwork = async () => {
      let chainId = parseInt(
        await window.ethereum.request({ method: "eth_chainId" })
      ).toString();
      setSelectedNetwork(chainId);
    };
    selectNetwork();
  }, []);

  const sendHandler = async () => {
    setLoading(true);
    try {
      console.log("Sending", amount, "USDC to", walletAddress);

      const tree = await getTree();

      // Get the notes with highest value
      let notes = await db.getAll("notes");
      notes = notes.sort((a, b) => {
        return parseInt(b.amount) - parseInt(a.amount);
      });
      let depositNotes = [];
      for (let note of notes.slice(0, 2)) {
        let n = await Note.from(note);
        depositNotes.push(n);
      }

      const withdrawAmount = parseUnits(amount + "", 6);
      const withdrawAddress = await Field.from(walletAddress);
      const keypair = await KeyPair.random();
      window.depositNotes = depositNotes;
      const tx = await tree.createTransaction({
        inputNotes: depositNotes,
        keypair,
        updateTree: true,
        depositAmount: withdrawAmount * -1n,
        withdrawAddress,
      });
      const { proof, publicInputs } = await tx.prove();
      console.log("Proof and public inputs generated");
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  // Handler for network selection change
  const handleNetworkChange = (e) => {
    setSelectedNetwork(e.target.value);
  };

  // Handler for amount change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const closeLoaderModal = () => {
    setLoading(false);
    setError(false);
    setSuccess(false);
  };

  return (
    <PageWrapper>
      <Sidebar />
      <div className='mt-20 flex justify-center'>
        <div className='w-[32%] flex flex-col items-center gap-2'>
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
          {!error && !success && !loading && (
            <>
              <div className='card-gradient pt-10 pb-4 rounded-2xl w-[100%]'>
                <div className='flex flex-col mb-3 items-center gap-4'>
                  <label className='text-[0.8rem]'>You're sending</label>
                  <input
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                      appearance: "none",
                      textAlign: "center",
                      fontSize: "2.5rem", // Adjust the size as needed
                      fontWeight: "bold",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                    }}
                    type='number'
                    className='text-5xl font-bold bg-transparent text-center border-none outline-none'
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <h2 className='text-[#93A0B9] font-medium flex gap-1 items-center'>
                    USDC
                    <RiArrowUpDownFill />
                  </h2>
                </div>
                <div className='p-[.71px] bg-black'></div>
                <div className='flex justify-between px-6 pt-2 pb-2'>
                  <select
                    id='network-select'
                    className='text-white bg-inherit text-center border-none w-full px-2 py-1 appearance-none'
                    value={selectedNetwork}
                    onChange={handleNetworkChange}
                    style={{ display: "block" }}
                  >
                    <option value=''>Select a network</option>
                    {Object.keys(Networks).map((network) => (
                      <option key={network} value={network}>
                        {Networks[network].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='card-gradient p-4 text-[.85rem] font-medium w-full text-center rounded-2xl'>
                <input
                  type='text'
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className='text-white bg-inherit text-center border-none w-full px-2 py-1 appearance-none mt-2'
                  placeholder='Enter Wallet Address'
                  style={{ background: "", outline: "none" }}
                />
              </div>
              <Button
                disabled={loading}
                className={`w-[100%] py-2 rounded-xl`}
                onClick={sendHandler}
              >
                Send
              </Button>
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Send;
