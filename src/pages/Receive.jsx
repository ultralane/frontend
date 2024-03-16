import PageWrapper from "../components/PageWrapper";
import dummyQr from "../assets/qrcode.png";
import Copy from "../components/Icons/Copy";
import TransactionHistory from "../components/TransactionHistory";
import { heading2 } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/ui/modal";
import Sidebar from "../components/Sidebar";

function Receive() {
  const [modalOpen, setModalOpen] = useState(false);
  const [body, setBody] = useState([]);

  const openModal = () => {
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
            onClick={openModal}
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
            <img src={dummyQr} alt='' />
            <h4 className='flex items-center gap-3 text-sm font-medium'>
              0xA9E78cef5e6c0081b68AdA2554c04198DfF17C69
              <Copy />
            </h4>
          </div>
        </Modal>
      )}
    </PageWrapper>
  );
}

export default Receive;