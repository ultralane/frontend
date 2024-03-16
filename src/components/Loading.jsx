import Lottie from "lottie-react";

function Loading({ animation }) {
  return (
    <div className="card-gradient-2 flex justify-center items-center z-50 py-32 bg-opacity-50 w-full rounded-3xl">
      <Lottie animationData={animation} />
    </div>
  );
}

export default Loading;
