import Lottie from "lottie-react";
import Close from "./Icons/Close";

function Loading({ animation, status, closeLoaderModal, loop = false }) {
  return (
    <div className='card-gradient-2 flex  relative flex-col justify-center items-center  py-32 bg-opacity-50 w-full rounded-3xl'>
      <Lottie animationData={animation} loop={loop} />
      <div className='mt-12'>{status}</div>
      <span
        className='absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-gray-700'
        onClick={closeLoaderModal}
      >
        <Close />
      </span>
    </div>
  );
}

export default Loading;
