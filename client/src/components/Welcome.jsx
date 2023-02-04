import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle, BsShieldFillCheck } from "react-icons/bs";
import { SlGlobe } from "react-icons/sl";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

import { TransactionContext } from "../context/TransactionContext";

import { Loader } from "./";
const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const ServiceCard = ({ color, title, icon, subtitle, order }) => (
  <motion.div
    initial={{ opacity: 0, x: -200 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: order }}
    viewport={{ once: true }}
    className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 hover:shadow-xl"
  >
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>

    <div className="ml-5 flex flex-col flex-1">
      <h1 className=" text-white text-md">{title}</h1>
      <p className="mt-1 text-white text-xs md:9/12">{subtitle}</p>
    </div>
  </motion.div>
);

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    isLoading,
  } = useContext(TransactionContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl text-white sm:text-4xl  py-1">
            Send Crypto
            <br />
            <Typewriter
              words={[
                "to your friends.",
                "to your coworkers.",
                "across the world.",
              ]}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              delaySpeed={1000}
            />
          </h1>

          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and Sell cryptocurrencies easily on
            Kryptovest
          </p>

          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          {/* <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div
              className={`rounded-tr-2xl sm:rounded-tr-none ${commonStyles}`}
            >
              Security
            </div>
            <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Ethereum</div>

            <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div
              className={`rounded-bl-2xl sm:rounded-bl-none ${commonStyles}`}
            >
              Low fees
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div> */}

          <div
            className={`flex-1 flex flex-col justify-start items-center overflow-hidden ${
              currentAccount && "mt-5"
            }`}
          >
            <ServiceCard
              order="1"
              color="bg-[#2952e3]"
              title="Secure & Reliable"
              icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
              subtitle="Security is guarenteed. We always maintain privacy and the quality of our products."
            />
            <ServiceCard
              order="1.5"
              color="bg-[#f7a000]"
              title="Send & Receive Ethereum"
              icon={<SiEthereum fontSize={21} className="text-white" />}
              subtitle="Security is guarenteed. We always maintain privacy and the quality of our products."
            />
            <ServiceCard
              order="2"
              color="bg-[#f84550]"
              title="Web 3.0 & Blockchain"
              icon={<SlGlobe fontSize={21} className="text-white" />}
              subtitle="Security is guarenteed. We always maintain privacy and the quality of our products."
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-64  my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div
                  className={`w-10 h-10 rounded-full border-2 border-white flex justify-center items-center ${
                    currentAccount && "animate-pulse"
                  }`}
                >
                  <SiEthereum fontSize={21} color="#fff" />
                </div>

                <div className="relative inline-block cursor-pointer group">
                  <BsInfoCircle fontSize={17} color="#fff" />
                  <span
                    className={`group-hover:visible invisible w-[100px] bg-blue-500 text-white text-xs text-center 
                  rounded-md p-2 absolute z-10 bottom-[150%] left-1/2 ml-[-50px]`}
                  >
                    {currentAccount
                      ? "Wallet connected!"
                      : "Wallet not connected."}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-light text-white text-sm truncate">
                  {`${currentAccount.slice(0, 5)}...${currentAccount.slice(
                    currentAccount.length - 4
                  )}`}
                </p>
                <h3 className="font-semibold text-white text-lg mt-1">
                  Ethereum
                </h3>
              </div>
            </div>
          </div>

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full my-2 bg-gray-400" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
