import { useEffect, useRef } from "react";
import Close from "../Icons/Close";

const Modal = ({ closeModal, children, className }) => {
  const modalRef = useRef();
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    // Attach event listener when the modal is opened
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Detach event listener when the modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className='fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-slate-900 bg-opacity-50'>
      {/* <div ref={modalRef} className="flex justify-center w-[100%]"> */}
      <div ref={modalRef} className='flex justify-center '>
        <div className={`${className} rounded-3xl overflow-hidden relative`}>
          <span
            className='absolute cursor-pointer right-2 top-2 text-gray-500 hover:text-gray-700'
            onClick={closeModal}
          >
            <Close />
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
