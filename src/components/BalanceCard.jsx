import { useState } from "react";
import Modal from "./ui/modal";
import Button from "./ui/button";
import classNames from "../utils/className";

function BalanceCard() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className='bg-[#121024] flex w-[270px] gap-8 rounded-md px-5 py-7 justify-between'>
        <h3 className='font-medium text-2xl'>
          4589 <br /> USDC
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
          <div className='py-20 px-12 card-gradient-2'>
            <h2 className='font-medium text-center text-2xl text-white'>
              Deposit to Ultralane
            </h2>
            <div className='w-full flex flex-col gap-8'>
              <div className='flex flex-col mt-10 gap-2'>
                <label htmlFor='network'>Network</label>
                <div className='border border-opacity-20 border-white px-2 py-1 bg-transparent rounded-lg'>
                  <span className='text-opacity-50 text-white'>
                    Select Network
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='amount'>Amount</label>
                <input
                  type='text'
                  id='amount'
                  name='amount'
                  placeholder='Enter amount'
                  className='px-2 py-1 border border-opacity-20 border-white bg-transparent rounded-lg  '
                />
              </div>
              <Button className={`w-full py-2 px-4 rounded-xl`}>Deposit</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default BalanceCard;
