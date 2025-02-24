import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import LoadingOverlay from '../../components/LoadingOverlay';
import RemoveConfirmation from '../../components/RemoveConfirm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from "../../constraints";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment, loadingGetAppointments, loadingCompleteAppointment, loadingCancelAppointment } = useContext(DoctorContext);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  if (loadingGetAppointments || loadingCompleteAppointment || loadingCancelAppointment) {
    return <LoadingOverlay />;
  }

  const handleRemoveClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRemoveModal(true);
  }

  const handleConfirmDelete = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/remove-appointment`, { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  }

  

  return (
    <div className='w-full bg-[#130e3d] text-[#d3bccc] p-3 md:p-6 shadow-lg border border-white/10'>
      <p className='mb-3 text-base md:text-lg font-medium bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100'>
        Doctor Appointments
      </p>
      <div className='bg-white/10 border border-white/20 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto backdrop-blur-sm'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr_2fr] py-3 px-4 md:px-6 border-b border-white/20 text-white/80'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Payment</p>
          <p className='text-center'>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr_2fr] p-4 md:px-6 border-b border-white/20 hover:bg-white/10 transition-all duration-300' key={index}>
            {/* Mobile View Header */}
            <div className='flex items-center justify-between sm:hidden mb-3'>
              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full border border-white/30' src={item.appointment.userData.image} alt='' />
                <p className='font-medium'>{item.appointment.userData.name}</p>
              </div>
              <p className='text-sm opacity-70'>{calculateAge(item.appointment.userData.dob)} years</p>
            </div>

            {/* Desktop Index */}
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Desktop Patient Info */}
            <div className='max-sm:hidden flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full border border-white/30' src={item.appointment.userData.image} alt='' />
              <p>{item.appointment.userData.name}</p>
            </div>

            {/* Desktop Age */}
            <p className='max-sm:hidden'>{calculateAge(item.appointment.userData.dob)}</p>

            {/* Date/Time - Mobile & Desktop */}
            <div className='sm:col-span-1 mb-2 sm:mb-0'>
              <p className='sm:hidden text-xs opacity-70 mb-1'>Date & Time:</p>
              <p>{slotDateFormate(item.appointment.slotDate)}, {item.appointment.slotTime}</p>
            </div>

            {/* Fees - Mobile & Desktop */}
            <div className='sm:col-span-1 mb-2 sm:mb-0'>
              <p className='sm:hidden text-xs opacity-70 mb-1'>Fees:</p>
              <p>{currency}{item.appointment.amount}</p>
            </div>

            {/* Payment - Mobile & Desktop */}
            <div className='sm:col-span-1 mb-3 sm:mb-0 flex items-center'>
              <p className='sm:hidden text-xs opacity-70 mr-2'>Payment:</p>
              <div className='border border-primary rounded-full px-3 py-1'>
                <p className='text-xs'>{item.appointment.payment ? "Online" : "Cash"}</p>
              </div>
            </div>

            {/* Status & Actions - Mobile & Desktop */}
            <div className='sm:col-span-1 flex items-center justify-start md:justify-center gap-2'>
              {item.appointment.cancelled ? (
                <div className='flex items-center gap-2'>
                  <span className="px-4 py-1.5 rounded-full text-xs font-medium text-red-400">
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
                </div>
              ) : item.appointment.isCompleted ? (
                <div className='flex items-center gap-2'>
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
                </div>
              ) : (
                <div className='flex gap-2 justify-end'>
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='text-red-400 text-[10px] font-medium'
                  >
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                      Cancel
                    </span>
                  </button>
                  <button 
                    onClick={() => completeAppointment(item._id)} 
                    className='text-green-400 text-[10px] font-medium'
                  >
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                      Complete
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
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

export default DoctorAppointments;