import Ellipse1 from "./Icons/Ellipse1";
import Ellipse2 from "./Icons/Ellipse2";
import { getNetwork } from "../utils/blockchain";
import { useEffect } from "react";

function parseHex(hex) {
  return hex.slice(0, 6) + "..." + hex.slice(-4);
}

function getHash(link) {
  let hash = link.split("/").pop();
  return parseHex(hash);
}

function TransactionHistory({ heading, body }) {
  return (
    <div className='rounded-xl border border-white relative border-opacity-25'>
      {/* if body length is greater than 3 then only show below ellipse */}
      {body?.length > 3 && (
        <>
          <span className='absolute top-0 right-0'>{/* <Ellipse2 /> */}</span>
          <span className='absolute bottom-0 left-0'>{/* <Ellipse1 /> */}</span>
        </>
      )}

      <table className='w-full'>
        <thead>
          <tr>
            {heading?.map((e) => (
              <th key={e.key} className='px-4 py-3 font-medium text-center'>
                {e.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan='6' className='px-4'>
              <hr className=' border-s border-white border-opacity-15' />
            </td>
          </tr>
          {body?.map((rowData, index) => (
            <tr key={index}>
              {Object.values(heading)?.map((e, i) => (
                <td key={i} className='px-4 py-6 text-center'>
                  {e.type === "hex" ? (
                    parseHex(rowData[e.key])
                  ) : e.type === "txHash" ? (
                    <a href={rowData[e.key]} target='_blank' rel='noreferrer'>
                      {getHash(rowData[e.key])}
                    </a>
                  ) : (
                    rowData[e.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
