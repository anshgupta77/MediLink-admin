import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useState } from 'react';

const Dashboard = () => {
  const { aToken, getDeshData, cancelAppointment, dashData, loadingGetDeshData } = useContext(AdminContext);
  const { slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDeshData();
    }
  }, [aToken]);

  if (loadingGetDeshData) {
    return <LoadingOverlay />;
  }

  return dashData && (
    <div className="w-full bg-[#130e3d] text-[#d3bccc] p-6 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
          Dashboard Overview
        </h1>
        <p className="text-[#d3bccc]/70 mt-2">Welcome to your healthcare dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center gap-4">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-white">{dashData.doctors}</p>
              <p className="text-[#d3bccc]/70">Total Doctors</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center gap-4">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-white">{dashData.appointments}</p>
              <p className="text-[#d3bccc]/70">Total Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center gap-4">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-white">{dashData.patients}</p>
              <p className="text-[#d3bccc]/70">Total Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="mt-8 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm">
        <div className="border-b border-white/20 p-4">
          <div className="flex items-center gap-3">
            <img src={assets.list_icon} alt="" className="w-6" />
            <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
              Latest Appointments
            </h2>
          </div>
        </div>

        <div className="divide-y divide-white/20">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="p-4 hover:bg-white/10 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
                  src={item.docData.image}
                  alt=""
                />
                <div>
                  <p className="font-medium text-white">{item.docData.name}</p>
                  <p className="text-sm text-[#d3bccc]/70">{slotDateFormate(item.slotDate)}</p>
                </div>
              </div>
              <div>
                {item.cancelled ? (
                  <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                    Completed
                  </span>
                ) : (
                  <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-gray-300">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;