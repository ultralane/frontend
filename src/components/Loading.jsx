import Lottie from "lottie-react";

function Loading({ animation,status }) {
  return (
    <div className="card-gradient-2 flex flex-col justify-center items-center z-50 py-32 bg-opacity-50 w-full rounded-3xl">
      <Lottie animationData={animation} />
      <div className="mt-12">
      {
        status=="loading" && <h3>Loading...</h3>
      }
      {
        status=="success" && <h3>Success</h3>
      }
      {
        status=="error" && <h3>Error!</h3>
      }
      </div>
    </div>
  );
}

export default Loading;
