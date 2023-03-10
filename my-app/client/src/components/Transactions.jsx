import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import useFetch from "../hooks/useFetch";
import Pagination from "./Pagination";
import { motion } from "framer-motion";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  amount,
  message,
  keyword,
  url,
}) => {
  const gifUrl = useFetch({ keyword });
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] 
    sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="nopener noreferrer"
          >
            <p className="text-white hover:text-blue-500 text-base">{`From: ${addressFrom.slice(
              0,
              5
            )}...${addressFrom.slice(addressFrom.length - 4)}`}</p>
          </a>

          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="nopener noreferrer"
          >
            <p className="text-white hover:text-blue-500 text-base">{`To: ${addressTo.slice(
              0,
              5
            )}...${addressTo.slice(addressTo.length - 4)}`}</p>
          </a>

          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>

        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />

        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <h3 className="text-[#22CDF6] font-bold tracking-normal">
            {timestamp}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  return (
    <div className="flex  w-full justify-center items-center 2xl:p-20">
      <div className="flex flex-col items-center md:p-12 py-12 px-4 overflow-hidden">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center py-2 border-b inline-block">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center py-2 ">
            Connect your acount to see latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions
            .reverse()
            .slice(firstPostIndex, lastPostIndex)
            .map((tran, i) => {
              return <TransactionCard key={i} {...tran} />;
            })}
        </div>

        <Pagination
          totalPosts={transactions.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Transactions;
