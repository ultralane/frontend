import PageWrapper from "../components/PageWrapper";
import Copy from "../components/Icons/Copy";
import TransactionHistory from "../components/TransactionHistory";
import { heading2 } from "../utils/constants";
import { useEffect, useState } from "react";
import Modal from "../components/ui/modal";
import Sidebar from "../components/Sidebar";
import { KeyPair, Field, Note } from "@ultralane/sdk";
import {
  Pool,
  getNetwork,
  fetchTransferEvents,
  getTree,
  USDC,
} from "../utils/blockchain";
import { ZeroHash, formatUnits } from "ethers";
import QRCode from "react-qr-code";
import { db } from "../utils/db";

const INIT_CODE_HASH = ZeroHash;

function Receive() {
  const [modalOpen, setModalOpen] = useState(false);
  const [body, setBody] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [keyPair, setKeyPair] = useState(null);

  useEffect(() => {
    const fetchKeyPair = async () => {
      let storage = localStorage.getItem("keyPair");
      let kp;
      if (!storage) {
        kp = await KeyPair.random();
        localStorage.setItem("keyPair", await keyPair.privateKey.hex());
      } else {
        kp = await KeyPair.newAsync(Field.from(storage));
      }
      setKeyPair(kp);
      let totalNubmerOfAddresses = localStorage.getItem(
        "totalNubmerOfAddresses"
      );
      if (!totalNubmerOfAddresses) {
        totalNubmerOfAddresses = 0;
      }
      let addresses = [];
      let pool = await Pool();
      let poolAddress = await pool.getAddress();
      for (let i = 0; i < totalNubmerOfAddresses; i++) {
        let addr = (
          await kp.deriveStealthAddress(i, poolAddress, INIT_CODE_HASH)
        ).address;
        addresses.push(addr);
      }
      console.log("Fetching transfer events");
      const netowrk = await getNetwork();
      let network_cached = await db.get("network", netowrk.chainId);
      if (!network_cached) {
        await db.add("network", netowrk);
        network_cached = netowrk;
      }
      let [lastBlock, events] = await fetchTransferEvents(
        network_cached?.startBlock,
        addresses
      );
      network_cached.startBlock = lastBlock;
      await db.put("network", network_cached);
      for (let i = 0; i < events.length; i++) {
        await db.add("receive", {
          from: events[i].args[0],
          to: events[i].args[1],
          amount: events[i].args[2],
          txHash: `${netowrk.explorer}/tx/${events[i].transactionHash}`,
        });
        let index = addresses.indexOf(events[i].args[1]);
        if (index == -1) {
          throw new Error("Address not found");
        }
        let { address, salt } = await kp.deriveStealthAddress(
          index,
          poolAddress,
          INIT_CODE_HASH
        );
        let stealthProof = await kp.proveStealthAddressOwnership(index);
        // let tree = await getTree();
        let note = new Note(events[i].args[2], kp, Field.random());
        let note_proof = await note.prove();
        let usdc = await USDC();
        let data = await pool.collect.populateTransaction(
          usdc,
          events[i].args[2],
          salt.hex(),
          stealthProof.proof,
          await note.commitmentHex(),
          note_proof.proof
        );
        console.log(data);
      }
      let data = await db.getAll("receive");
      let formattedData = data.map((item) => {
        return {
          ...item,
          amount: formatUnits(item.amount, 6),
        };
      });
      setBody(formattedData);
    };
    fetchKeyPair();
  }, []);

  const generateAddress = async () => {
    let pool = await Pool();
    let poolAddress = await pool.getAddress();
    let totalNubmerOfAddresses = localStorage.getItem("totalNubmerOfAddresses");
    if (!totalNubmerOfAddresses) {
      totalNubmerOfAddresses = 0;
    }
    if (!keyPair) {
      return;
    }
    let addr = (
      await keyPair.deriveStealthAddress(
        totalNubmerOfAddresses,
        poolAddress,
        INIT_CODE_HASH
      )
    ).address;
    setNewAddress(addr);
    totalNubmerOfAddresses++;
    localStorage.setItem("totalNubmerOfAddresses", totalNubmerOfAddresses);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <PageWrapper>
      <Sidebar />
      <div className=''>
        <div className='text-right'>
          <button
            style={{ backgroundColor: "rgba(14, 219, 216, 0.73)" }}
            className='opacity-90 rounded-xl px-4 py-2 text-[20px]'
            onClick={generateAddress}
          >
            Create New
          </button>
        </div>
        <h1 className='font-bold mb-4 mt-[4rem] text-3xl'>ADDRESSES</h1>
        <div className='mt-10'>
          <TransactionHistory heading={heading2} body={body} />
        </div>
      </div>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <div className='flex flex-col w-full items-center px-4 pt-8 pb-20 gap-6 card-gradient'>
            <h2 className='text-[1.04rem] font-medium'>New Address</h2>
            <QRCode value={newAddress} size={200} />
            <h4 className='flex items-center gap-3 text-sm font-medium'>
              {newAddress}
              <Copy />
            </h4>
          </div>
        </Modal>
      )}
    </PageWrapper>
  );
}

export default Receive;
