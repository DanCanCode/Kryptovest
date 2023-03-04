import { useState, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { FiUser, FiLogOut, FiTool } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { me, logout } from "../store/user";
import logo from "../../public/logo.png";

const NavbarItem = ({ title, classProps }) => {
  return (
    <li
      className={`mx-4 cursor-pointer ${classProps} ${
        title == "Tutorials" && "line-through cursor-not-allowed"
      } ${title == "News" && "line-through cursor-not-allowed"}`}
    >
      {title}
    </li>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(me());
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="w-48 cursor-pointer"
        />
      </div>

      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "News"].map((title, index) => (
          <NavbarItem key={title + index} title={title} />
        ))}
        <li className={`relative ${userData.id ? "list-item" : "hidden"}`}>
          <img
            onClick={() => setToggleProfile(!toggleProfile)}
            src={userData.image}
            alt="user image"
            className="w-12 h-12 rounded-full active:border-2 border-[#2952e3] cursor-pointer object-cover object-center"
          />

          <div
            className={`bg-white rounded-md  p-4 ${
              toggleProfile ? "absolute" : "hidden"
            } z-10 top-14 `}
          >
            <div className="flex flex-col text-black space-y-2 text-lg">
              <a
                href="/profile"
                className="flex items-center cursor-pointer hover:text-[#2952e3]"
              >
                <FiUser className="mr-2" />
                Profile
              </a>
              <a
                href="/settings"
                className="flex items-center cursor-pointer hover:text-[#2952e3]"
              >
                <FiTool className="mr-2" />
                Settings
              </a>
              <p
                onClick={handleLogout}
                className="flex items-center cursor-pointer hover:text-[#2952e3]"
              >
                <FiLogOut className="mr-2" />
                Logout
              </p>
            </div>
          </div>
        </li>

        <li
          onClick={() => navigate("/login")}
          className={`bg-[#2952e3] py-2 px-7 text-center mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] ${
            userData.id ? "hidden" : "list-item"
          }`}
        >
          Login
        </li>
      </ul>

      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden 
          list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                className="cursor-pointer"
                onClick={() => setToggleMenu(false)}
              />
            </li>
            {["Market", "Exchange", "Tutorials", "News"].map((title, index) => (
              <NavbarItem
                key={title + index}
                title={title}
                classProps="my-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
