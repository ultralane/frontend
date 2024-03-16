import Button from "../components/ui/button";
import banner from "../assets/banner-image.png";
import UprightArrow from "../components/Icons/UprightArrow";
import Globe from "../components/Icons/Globe";
import Wavy_Check from "../components/Icons/Wavy_Check";
import Crypto3 from "../components/Icons/Crypto3";
import Solidity from "../components/Icons/Solidity";
import bitcoin from "../assets/bitcoin.png";
import Crypto2 from "../components/Icons/Crypto2";
import Crypto1 from "../components/Icons/Crypto1";
import eth from "../assets/eth.png";
import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();
  return (
    <div className='py-20 px-32'>
      <nav className='flex justify-between items-center'>
        <h1 className='text-xl font-medium'>Ultralane</h1>
        <div className='flex gap-14'>
          <span className='text-[.9rem] font-medium'>HOME</span>
          <span className='text-[.9rem] font-medium'>DOCS</span>
          <span className='text-[.9rem] font-medium'>EXPLORER</span>
        </div>
        <Button
          className={`px-7 py-2 text-[15px] rounded-3xl`}
          onClick={() => navigate("/login")}
        >
          Launch App
        </Button>
      </nav>
      <div className='flex gap-2 items-center justify-center'>
        <div className='flex flex-col gap-8 items-start'>
          <h2 className='text-[40px] break-words font-medium'>
            Use your funds on any <br /> chain instantly without <br />{" "}
            bridging.
          </h2>
          <Button
            className={`flex px-4 py-2 rounded-2xl gap-4`}
            onClick={() => navigate("/login")}
          >
            Launch App
            <UprightArrow />
          </Button>
        </div>
        <div className='w-1/2'>
          <img src={banner} loading='lazy' alt='' />
        </div>
      </div>
      <div>
        <h2 className='text-[40px] text-center font-bold'>
          Why <span className='gradient-text'>Ultralane?</span>
        </h2>
        <div className='flex gap-20 justify-center mt-12'>
          <div className='flex flex-col gap-8  px-6 pt-8 pb-12 border border-opacity-20 border-white rounded-2xl w-[30%]'>
            <Globe />
            <h2 className='font-medium text-2xl'>Unified Funds</h2>
            <p className='text-opacity-60 text-white'>
              Funds are scattered across multiple chains, making it hard to keep
              track of. With Ultralane, put your money in one spot and use it
              anywhere, no extra steps needed.
            </p>
          </div>
          <div className='flex flex-col gap-8  px-6 py-8 border border-opacity-20 border-white rounded-2xl w-[30%]'>
            <Wavy_Check />
            <h2 className='font-medium text-2xl'>Instant Payment</h2>
            <p className='text-opacity-60 text-white'>
              Moving funds to another chain for spending involves a slow,
              tedious bridging process. With Ultralane, as soon as you add your
              money, you can spend it instantly on any chain, no waiting.
            </p>
          </div>
          <div className='flex flex-col gap-8  px-6 py-8 border border-opacity-20 border-white rounded-2xl w-[30%]'>
            <Globe />
            <h2 className='font-medium text-2xl'>Private Payment</h2>
            <p className='text-opacity-60 text-white'>
              Generally in private payment both the party has to be on the same
              platform but with Ultralane you can make private payment even if
              the other party is on different platform.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-24'>
        <h2 className='text-[40px] text-center font-bold'>
          Supported <span className='gradient-text'>Networks</span>
        </h2>
        <div className='flex justify-around items-center px-12 mt-12'>
          <img src={bitcoin} width={`35px`} height={`35px`} alt='' />
          <img src={eth} alt='' width={`35px`} height={`35px`} />
          <Crypto3 />
          <Solidity />
          <Crypto2 />
          <Crypto1 />
        </div>
      </div>

      <div className='mt-24 flex gap-10 flex-col items-center'>
        <h2 className='text-[40px] text-center font-bold'>
          Powered by <span className='gradient-text'>Hyperlane</span>
        </h2>
        <Button
          className={`px-6 py-3 flex gap-3 rounded-3xl`}
          onClick={() => navigate("/login")}
        >
          Open dapp <UprightArrow />
        </Button>
      </div>

      <footer className='mt-24'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-4'>
            <h2>Want product news and updates?</h2>
            <h3 className='font-thin'>Subsribe to our newsletter</h3>
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Your Email'
                className='border border-white bg-transparent px-4 py-1 rounded-2xl'
              />
              <Button className={`px-8 py-2 rounded-2xl font-medium`}>
                Subsribe
              </Button>
            </div>
            <h4 className='font-thin'>No spam, you can unsubsribe now !</h4>
          </div>
          <div className='flex flex-col justify-center gap-4'>
            <h3>Twitter</h3>
            <h3>Telegram</h3>
            <h3>Github</h3>
          </div>
        </div>
        <h3 className='font-thin text-center mt-12'>
          © 2024 Ultralane, Inc. All rights reserved.
        </h3>
      </footer>
    </div>
  );
}

export default Landing;
