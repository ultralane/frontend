import BalanceCard from "../components/BalanceCard";
import TransactionHistory from "../components/TransactionHistory";
import PageWrapper from "../components/PageWrapper";
import { heading1 } from "../utils/constants";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

function Profile() {
  const [body, setBody] = useState([]);

  const updateBody = (data) => {
    setBody(body.concat(data));
  };

  return (
    <PageWrapper>
      <Sidebar />
      <div className='flex gap-24'>
        <div>
          <h3 className='font-medium mb-4 text-[#0EDBD8]'>Ultralane Balance</h3>
          <BalanceCard updateBody={updateBody} />
        </div>
      </div>
      <div className='mt-12'>
        <h2 className='font-medium text-[1.7rem]'>HISTORY</h2>
        <div className='mt-6'>
          <TransactionHistory heading={heading1} body={body} />
        </div>
      </div>
    </PageWrapper>
  );
}

export default Profile;
