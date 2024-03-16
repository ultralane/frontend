import classNames from "../utils/className";
import Button from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Networks } from "../utils/constants";

function PageWrapper({ children, className }) {
  useEffect(() => {
    // check if user is there in supported networks
    const checkNetwork = async () => {
      let chainId = parseInt(
        await window.ethereum.request({ method: "eth_chainId" })
      ).toString();
      if (!Object.keys(Networks).includes(chainId)) {
        alert("Please switch to supported network");
      }
    };
    checkNetwork();
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <main
      className={`ml-[280px] h-screen relative p-28 ${classNames(className)}`}
    >
      <Button
        className={`rounded-3xl px-7 py-2 absolute top-5 right-28`}
        onClick={logout}
      >
        Logout
      </Button>
      {children}
    </main>
  );
}

export default PageWrapper;
