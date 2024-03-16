import { useNavigate } from "react-router-dom";
import Metamask from "../components/Icons/Metamask";
import { api } from "../utils/api";
import { BrowserProvider } from "ethers";

function Login() {
  const navigate = useNavigate();
  const login = async () => {
    if (!window.ethereum) {
      alert("Metamask not found");
      return;
    }
    const addresses = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (!addresses.length) {
      alert("No address found");
      return;
    }
    const address = window.ethereum.selectedAddress;
    const nonce_res = await api.get(`/auth/nonce/${address}`);
    const nonce = nonce_res.data.nonce;

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(`${nonce}`);

    const login_res = await api.post(`/auth/login`, {
      address,
      signature,
    });
    const token = login_res.data.token;
    localStorage.setItem("token", token); // TODO: use secure storage
    navigate("/profile");
  };

  return (
    <div className='grid place-items-center h-screen'>
      <button
        className='bg-[#FF5C00] opacity-90 w-[18%] rounded-2xl py-4 flex items-center justify-center gap-4'
        onClick={login}
      >
        <span>
          <Metamask />
        </span>
        Metamask
      </button>
    </div>
  );
}

export default Login;
