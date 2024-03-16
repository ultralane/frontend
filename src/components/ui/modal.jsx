import { useEffect, useRef } from "react";

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
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
