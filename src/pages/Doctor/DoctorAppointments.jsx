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
    <div className='w-full bg-[#130e3d] text-[#d3bccc] p-6 shadow-lg border border-white/10'>
      <p className='mb-3 text-lg font-medium bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100'>Doctor Appointments</p>
      <div className='bg-white/10 border border-white/20 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll backdrop-blur-sm'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr_2fr] py-3 px-6 border-b border-white/20 text-white/80'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Payment</p>
          <p className='text-center'>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr_2fr] items-center text-[#d3bccc] py-3 px-6 border-b border-white/20 hover:bg-white/10 transition-all duration-300' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full border border-white/30' src={item.appointment.userData.image} alt='' />
              <p>{item.appointment.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.appointment.userData.dob)}</p>
            <p>{slotDateFormate(item.appointment.slotDate)}, {item.appointment.slotTime}</p>
            <p>{currency}{item.appointment.amount}</p>
            <div className='border border-primary rounded-full w-1/2 flex justify-center'>
                <p className='text-xs '>{item.appointment.payment ? "Online" : "Cash"}</p>
            </div>
            {item.appointment.cancelled ? (
              <div className='flex items-center gap-2 justify-center'>
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
              </div>
            ) : item.appointment.isCompleted ? (
              <div className='flex items-center justify-center'>
              <span className="px-4 py-1.5 rounded-full text-xs font-medium  text-green-400">
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
              <div className='flex gap-2 justify-center'>
                <button onClick={() => cancelAppointment(item._id)} className='text-red-400 text-[10px] font-medium'><span className="px-4 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                      Cancel
                    </span></button>
                <button onClick={() => completeAppointment(item._id)} className='text-green-400 text-[10px] font-medium'><span className="px-4 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                      Complete
                    </span></button>
              </div>
            )}
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