import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { me, updateUser, deleteUser } from "../store/user";
import FileBase from "react-file-base64";

const Input = ({ name, type, userData, formData, setFormData, icon }) => (
  <div>
    <label className="text-white font-semibold">{name}:</label>

    <div className="relative">
      {icon}
      <input
        placeholder={name == "password" ? "******" : userData[name]}
        type={type}
        step="0.0001"
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className="pl-8 my-2 w-full rounded-sm p-2 text-sm bg-white/20"
      />
    </div>
  </div>
);

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(me());
    }
  }, [window.localStorage]);

  const handleUpdate = (e, type) => {
    e.preventDefault;

    if (formData[type].length) {
      dispatch(updateUser({ ...userData, [type]: formData[type] }));
      setFormData({ ...formData, [type]: "" });
    } else {
      window.alert("Please fill out field");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault;
    dispatch(deleteUser(userData.id));
    window.alert("Account successfully deleted.");
    window.localStorage.removeItem("token");
  };

  const userData = useSelector((state) => state.user);

  return (
    <div className="mx-6 md:p-16 py-12 px-4  text-white">
      <h2 className="text-3xl py-2 border-b ">Settings</h2>

      <div className="flex flex-col p-6 space-y-2">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-4">
            <img
              id="user-image"
              src={userData.image}
              alt="user image"
              className="rounded-full w-24 h-24 object-cover object-center"
            />
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, image: base64 })
              }
            />
          </div>

          <button
            onClick={(e) => handleUpdate(e, "image")}
            className="text-white border-[1px] py-2 px-4 border-[#3d4f7c] rounded-full cursor-pointer"
          >
            Upload Image
          </button>
        </div>

        <div className="flex justify-between items-center px-4 py-2">
          <Input
            name="name"
            type="text"
            userData={userData}
            formData={formData}
            setFormData={setFormData}
            icon={<FiUser className="absolute text-white z-10 top-4 left-2" />}
          />
          <button
            onClick={(e) => handleUpdate(e, "name")}
            className="text-white border-[1px] py-2 px-4 border-[#3d4f7c] rounded-full cursor-pointer"
          >
            Update
          </button>
        </div>

        <div className="flex justify-between items-center px-4 py-2">
          <Input
            name="email"
            type="email"
            userData={userData}
            formData={formData}
            setFormData={setFormData}
            icon={<FiUser className="absolute text-white z-10 top-4 left-2" />}
          />
          <button
            onClick={(e) => handleUpdate(e, "email")}
            className="text-white border-[1px] py-2 px-4 border-[#3d4f7c] rounded-full cursor-pointer"
          >
            Update
          </button>
        </div>

        <div className="flex justify-between items-center px-4 py-2">
          <Input
            name="password"
            type="password"
            userData={userData}
            formData={formData}
            setFormData={setFormData}
            icon={<FiUser className="absolute text-white z-10 top-4 left-2" />}
          />
          <button
            onClick={(e) => handleUpdate(e, "password")}
            className="text-white border-[1px] py-2 px-4 border-[#3d4f7c] rounded-full cursor-pointer"
          >
            Update
          </button>
        </div>

        <div className="border-b" />

        <div className="flex justify-between items-center p-4">
          <div>
            <p className="font-semibold text-lg">Delete Account:</p>
            <p>Once you delete, there is no going back.</p>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 border-[1px] py-2 px-4 border-red-500 rounded-full cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
