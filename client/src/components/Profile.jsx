import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { me } from "../store/user";

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

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(me());
    }
  }, [window.localStorage]);

  const userData = useSelector((state) => state.user);
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center md:p-20 py-12 px-4  text-white">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={userData.image}
            alt="user image"
            className="w-48 h-48 rounded-full"
          />
          <h3 className="text-3xl">{userData.name}</h3>
          <p className="text-sm opacity-60">{userData.email}</p>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl text-center py-2 border-b inline-block">
            Previous Transactions
          </h2>

          <div className="flex flex-wrap justify-center items-center mt-10">
            {userData?.Trasactions?.length ? (
              userData.Trasactions.map((tran, i) => {
                return <TransactionCard key={i} {...tran} />;
              })
            ) : (
              <p className="text-lg">No Previous Transactions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
