import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { fetchUser, createUser } from "../store/user";

const Input = ({ placeholder, name, type, formData, setFormData, icon }) => (
  <div className="w-full">
    <label className="text-white">{name}:</label>

    <div className="relative">
      {icon}
      <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className="pl-8 my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      />
    </div>
  </div>
);

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [tokenExist, setTokenExist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/");
    } else if (token) {
      setTokenExist(true);
      window.localStorage.setItem("token", token);
      navigate("/");
    }
  }, [token, window.localStorage]);

  const handleSubmit = (type) => {
    console.log(type);
    if (type === "login") {
      try {
        dispatch(fetchUser(formData));
      } catch (error) {
        window.alert(error);
      }
    } else {
      try {
        dispatch(createUser(formData));
      } catch (error) {
        window.alert(error);
      }
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col md:p-20 py-12 px-4  items-center">
        <h2 className="text-3xl text-white sm:text-4xl py-2 border-b">
          Login In or Sign Up
        </h2>

        <div className="mt-10 p-5 sm:w-96 w-full flex flex-col  items-center blue-glassmorphism">
          <Input
            placeholder="John Doe"
            name="name"
            type="text"
            formData={formData}
            setFormData={setFormData}
            icon={<FiUser className="absolute text-white z-10 top-4 left-2" />}
          />

          <Input
            placeholder="johndoe@gmail.com"
            name="email"
            type="email"
            formData={formData}
            setFormData={setFormData}
            icon={<FiMail className="absolute text-white z-10 top-4 left-2" />}
          />

          <Input
            placeholder="Enter password"
            name="password"
            type="password"
            formData={formData}
            setFormData={setFormData}
            icon={<FiLock className="absolute text-white z-10 top-4 left-2" />}
          />

          <div className="h-[1px] w-full my-2 bg-gray-400" />

          <div className="flex w-full justify-between space-x-4">
            <button
              onClick={() => handleSubmit("login")}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => handleSubmit("signup")}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
