import React, { useContext, useEffect, useState} from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';
import LoadingOverlay from '../../components/LoadingOverlay';
import RemoveConfirmation from '../../components/RemoveConfirm';
import axios from 'axios';
import { toast } from 'react-toastify';
const DoctorDashboard = () => {

  const { dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment, loadingGetDashData } = useContext(DoctorContext);
  const { currency, slotDateFormate } = useContext(AppContext);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (loadingGetDashData) {
    return (
      <LoadingOverlay />
    )
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
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }

  }

  return dashData && (
    <div className='w-full max-w-6xl m-5'>
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency}{dashData.earning}</p>
            <p className='text-gray-400'>Earning</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10 bg-gray-200' src={item.appointment.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.appointment.userData.name}</p>
                  <p className='text-gray-600 flex gap-2'>{slotDateFormate(item.appointment.slotDate)},<span>{item.appointment.slotTime}</span></p>
                </div>
                {
                  item.appointment.cancelled
                    ? <div className='flex items-center gap-2'>
                        <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                        <button
                        onClick={() => handleRemoveClick(item.appointment)} 
                        className=" text-red-600 hover:text-red-800 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                    </div>
                    : item.appointment.isCompleted
                        ? <div className='flex items-center gap-2'>
                            <p className='text-green-500 text-xs font-medium'>Completed</p>
                            <button
                            onClick={() => handleRemoveClick(item.appointment)} 
                            className=" text-red-600 hover:text-red-800 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                      : <div className='flex'>
                        <img onClick={() => cancelAppointment(item.appointment._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={() => completeAppointment(item.appointment._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                      </div>
                }
              </div>
            ))
          }
        </div>
      </div>
          <RemoveConfirmation
            isOpen={showRemoveModal}
            onClose={() => setShowRemoveModal(false)}
            onConfirm={()=>handleConfirmDelete(selectedAppointment?._id)}
            DeleteDataName={selectedAppointment?.userData.name}
          />
    </div>
  )
}

export default DoctorDashboard