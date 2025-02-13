import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets_admin/assets';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  }

  const dlogout = () => {
    navigate("/");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-md">
      <div className="flex items-center gap-1">
        {/* Logo */}
        <img
          className="w-14 sm:w-14"
          src={assets.admin_logo}
          alt="Admin Logo"
        />

        {/* Title and Subtitle */}
        <div>
          <h1
            className="text-xl sm:text-2xl font-bold"
          >
            Appointify
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Dashboard Panel
          </p>
        </div>

        {/* Role Badge */}
        <p className="border px-3 py-1 rounded-full border-gray-400 text-gray-600 bg-gray-100 text-xs sm:text-sm">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={aToken ? logout : dlogout}
        className="bg-primary text-white text-sm px-6 sm:px-10 py-2 rounded-full hover:bg-blue-700 transition duration-300"
      >
        Logout
      </button>
    </div>

  )
}

export default Navbar