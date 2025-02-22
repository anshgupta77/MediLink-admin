

import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { assets } from '../assets/assets_admin/assets';

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
    <div className="bg-[#130e3d] text-[#d3bccc]">
      <div className="px-4 sm:px-10 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Logo and Title Section */}
            <div className="flex items-center gap-3">
              {/* <div className="bg-white p-2 rounded-lg shadow-lg">
                /
              </div> */}
              
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100">
                  MediLink
                </h1>
                <p className="text-xs sm:text-sm text-purple-200">
                  Dashboard Panel
                </p>
              </div>
            </div>

            {/* Role Badge */}
            <span className="hidden sm:flex px-4 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium">
              {aToken ? "Admin" : "Doctor"}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={aToken ? logout : dlogout}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 
                     border border-white/20 backdrop-blur-sm transition-all duration-300 group"
          >
            <span className="text-sm font-medium">Logout</span>
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Bottom Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-purple-300/20 via-white/20 to-indigo-300/20" />
    </div>
  );
};

export default Navbar;