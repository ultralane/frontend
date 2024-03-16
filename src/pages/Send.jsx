import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/Sidebar";
import Button from "../components/ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import successAnimation from "../assets/success.json";
import loadingAnimation from "../assets/loading.json";
import errorAnimation from "../assets/error.json";
import { useState } from "react";
import Loading from "../components/Loading";

function Send() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const sendHandler = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // setError(true)
      setTimeout(() => {
        setSuccess(false);
        // setError(false)
      }, 1400);
    }, 4000);
  };
  return (
    <PageWrapper>
      <Sidebar />
      <div className="mt-20 flex justify-center ">
        <div className="w-[32%] flex flex-col items-center gap-2">
          {/* {
          success &&
      <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-slate-900 bg-opacity-50">
      <Lottie animationData={successAnimation}/>
</div>
        } */}
          {loading && (
            // <div className="fixed card-gradient-2 inset-0 z-50 overflow-auto flex justify-center items-center bg-slate-900 bg-opacity-50">
            <Loading animation={loadingAnimation} />
          )}

          {success && <Loading animation={successAnimation} />}

          {error && <Loading animation={errorAnimation} />}

          {!error && !success && !loading && (
            <>
              <div className="card-gradient pt-10 pb-4 rounded-2xl w-[100%]">
                <div className="flex flex-col mb-3 items-center gap-4">
                  <label className="text-[0.8rem]">You're sending</label>
                  <h2 className="text-5xl font-bold">95</h2>
                  <h2 className="text-[#93A0B9] font-medium flex gap-1 items-center ">
                    95 USD
                    <RiArrowUpDownFill />
                  </h2>
                </div>
                <div className="p-[.71px] bg-black"></div>
                <div className="flex justify-between px-6 pt-2 pb-2">
                  <label htmlFor="" className="text-[.8rem] font-medium">
                    Select Token
                  </label>
                  <select className="text-white bg-inherit border-none"></select>
                </div>
              </div>
              <div className="card-gradient p-4 text-[.85rem] font-medium w-full text-center rounded-2xl">
                Wallet address ENS
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
