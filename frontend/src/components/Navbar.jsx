import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { AiFillAppstore } from "react-icons/ai";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { logout } from "./Logout";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toggle profile dropdown menu
  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    toast.success("Logout Successful");
    logout(navigate);
  };

  return (
    <nav className="z-30 fixed top-0 left-0 right-0 bg-col-light flex sm:m-4 sm:rounded-lg lg:flex-col lg:w-16 lg:mt-10">
      <div className="w-8 h-8 m-3 p-1">
        {/* Logo */}
        <img src={logo} className="w-6 h-6" alt="Logo" />
      </div>
      <div className="flex p-3 mt-1 lg:m-1 lg:flex-col ml-auto lg:mt-12">
        {/* Navigation links */}
        <div>
          <Link
            to="/home"
            className={
              location.pathname === "/home"
                ? "text-white opacity-100"
                : "opacity-50 hover:text-col-red hover:opacity-100"
            }
          >
            <AiFillAppstore className="w-6 h-6 mr-4 lg:mb-8" />
          </Link>
        </div>
        <div>
          <Link
            to="/movies"
            className={
              location.pathname === "/movies"
                ? "text-white opacity-100"
                : "opacity-50 hover:text-col-red hover:opacity-100"
            }
          >
            <MdLocalMovies className="w-6 h-6 mr-4 lg:mb-8" />
          </Link>
        </div>
        <div>
          <Link
            to="/tvseries"
            className={
              location.pathname === "/tvseries"
                ? "text-white opacity-100"
                : "opacity-50 hover:text-col-red hover:opacity-100"
            }
          >
            <PiTelevisionFill className="w-6 h-6 mr-4 lg:mb-8" />
          </Link>
        </div>
        <div>
          <Link
            to="/bookmark"
            className={
              location.pathname === "/bookmark"
                ? "text-white opacity-100"
                : "opacity-60 hover:text-col-red hover:opacity-100"
            }
          >
            <FaBookmark className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="flex m-4 lg:mt-72 lg:pt-16">
        {/* Profile button */}
        <button
          onClick={handleProfileClick}
          className="opacity-60 hover:text-col-red hover:opacity-100 text-white"
        >
          <CgProfile className="w-6 h-6" />
        </button>
        {isProfileOpen && (
          <div className="absolute right-0 lg:left-0 lg:bottom-0.5 lg:ml-20 mt-8 w-48 bg-col-light rounded-lg shadow-lg p-2">
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-col-red rounded-xl"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
