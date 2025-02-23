import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';
import LoadingOverlay from '../../components/LoadingOverlay';
import RemoveConfirmation from '../../components/RemoveConfirm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from "../../constraints";


const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment, loadingGetDashData } = useContext(DoctorContext);
  const { currency, slotDateFormate } = useContext(AppContext);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (loadingGetDashData) {
    return <LoadingOverlay />;
  }

  const handleRemoveClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRemoveModal(true);
  };

  const handleConfirmDelete = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/remove-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return dashData && (
    <div className="w-full bg-[#130e3d] text-[#d3bccc] p-6 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
          Doctor Dashboard
        </h1>
        <p className="text-[#d3bccc]/70 mt-2">Welcome to your doctor portal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center gap-4">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-white">{currency}{dashData.earning}</p>
              <p className="text-[#d3bccc]/70">Total Earnings</p>
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
              Latest Bookings
            </h2>
          </div>
        </div>

        <div className="divide-y divide-white/20">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="p-4 hover:bg-white/10 transition-all duration-300 flex flex-col lg:flex-row items-center justify-between gap-5"  
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
                  src={item.appointment.userData.image}
                  alt=""
                />
                <div>
                  <p className="font-medium text-white">{item.appointment.userData.name}</p>
                  <p className="text-sm text-[#d3bccc]/70">
                    {slotDateFormate(item.appointment.slotDate)}, {item.appointment.slotTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {item.appointment.cancelled ? (
                  <>
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium  text-red-400">
                      Cancelled
                    </span>
                    <button
                      onClick={() => handleRemoveClick(item.appointment)}
                      className="text-red-400 hover:text-red-300 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : item.appointment.isCompleted ? (
                  <>
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium text-green-400">
                      Completed
                    </span>
                    <button
                      onClick={() => handleRemoveClick(item.appointment)}
                      className="text-red-400 hover:text-red-300 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                    <div className='flex gap-2'>
                      <button onClick={() => cancelAppointment(item.appointment._id)} className='text-red-400 text-[10px] font-medium'><span className="px-4 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                      Cancel
                    </span></button>
                      <button onClick={() => completeAppointment(item.appointment._id)} className='text-green-400 text-[10px] font-medium'><span className="px-4 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                      Complete
                    </span></button>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <RemoveConfirmation
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={() => handleConfirmDelete(selectedAppointment?._id)}
        DeleteDataName={selectedAppointment?.userData.name}
      />
    </div>
  );
};

export default DoctorDashboard;