import { APP_NAME } from "../utils/constants";
import { FiSend } from "react-icons/fi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { RiArrowUpDownFill } from "react-icons/ri";
import Receive from "./Icons/Receive";
import Send from "./Icons/Send";

function Sidebar() {
  return (
    <div className="w-[270px] top-0 left-0 h-screen flex flex-col justify-between fixed bg-[#150B33]">
      <h1 className="mt-8 font-bold text-2xl text-center text-white">
        {APP_NAME}
      </h1>
      <div className="flex w-[65%] mb-[15rem] flex-col gap-2">
        <NavLink to={`/profile`}>
          <button className="sidebar-btn">
            <RiAccountPinCircleFill />
            Profile
          </button>
        </NavLink>
        <NavLink to={`/send`}>
          <button className="sidebar-btn relative">
            <span className="absolute left-12">
              <Send />
            </span>
            <span className="ml-4">Send</span>
          </button>
        </NavLink>
        <NavLink to={`/receive`}>
          <button className="sidebar-btn">
            <Receive />
            Receive
          </button>
        </NavLink>
      </div>
      <div>
        {/* <hr className="opacity-5"/> */}
        {/* <div className="pb-10 pt-8 font-medium text-center text-[1.1rem]">$ Test Faucet</div> */}
      </div>
    </div>
  );
}

export default Sidebar;
