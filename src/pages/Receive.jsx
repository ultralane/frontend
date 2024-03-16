import PageWrapper from "../components/PageWrapper";
import dummyQr from "../assets/qrcode.png";
import Copy from "../components/Icons/Copy";
import TransactionHistory from "../components/TransactionHistory";
import { heading2 } from "../utils/constants";
import { useEffect, useState } from "react";
import Modal from "../components/ui/modal";
import Sidebar from "../components/Sidebar";
import { KeyPair, Field } from "@ultralane/sdk";
import { Pool } from "../utils/blockchain";
import { ZeroHash } from "ethers";
import QRCode from "react-qr-code";

function Receive() {
  const [modalOpen, setModalOpen] = useState(false);
  const [body, setBody] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  let keyPair;
  useEffect(() => {
    const setKeyPair = async () => {
      let storage = localStorage.getItem("keyPair");
      if (!storage) {
        keyPair = await KeyPair.random();
        localStorage.setItem("keyPair", await keyPair.privateKey.hex());
      } else {
        keyPair = await KeyPair.newAsync(Field.from(storage));
      }
    };
    setKeyPair();
  });

  const generateAddress = async () => {
    let pool = await Pool();
    let poolAddress = await pool.getAddress();
    let totalNubmerOfAddresses = localStorage.getItem("totalNubmerOfAddresses");
    if (!totalNubmerOfAddresses) {
      totalNubmerOfAddresses = 0;
    }
    let addr = (
      await keyPair.deriveStealthAddress(
        totalNubmerOfAddresses,
        poolAddress,
        ZeroHash
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
