import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import LoadingOverlay from '../../components/LoadingOverlay';
import RemoveConfirmation from '../../components/RemoveConfirm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from "../../constraints";
const DoctorAppointments = () => {

    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment , loadingGetAppointments, loadingCompleteAppointment, loadingCancelAppointment } = useContext(DoctorContext);
    console.log(dToken);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const { calculateAge, slotDateFormate, currency } = useContext(AppContext);
    // const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";


    

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
    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    
    if(loadingGetAppointments || loadingCompleteAppointment || loadingCancelAppointment){
        return (
            <LoadingOverlay/>
        )
    }
    
    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>

                <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {
                    appointments.reverse().map((item, index) => (
                        <div className='flex flex-wrap justify-between max-sm:gap-2 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 rounded-full' src={item.appointment.userData.image} alt="" />
                                <p>{item.appointment.userData.name}</p>
                            </div>
                            <div>
                                <p className='text-xs inline border border-primary px-2 rounded-full'>
                                    {item.appointment.payment ? "Online" : "Cash"}
                                </p>
                            </div>
                            {console.log(item.appointment.userData.gender)}
                            <p className='max-sm:hidden'>{calculateAge(item.appointment.userData.dob)}</p>
                            <p className='text-gray-600 flex gap-2'>{slotDateFormate(item.appointment.slotDate)}, <span>{item.appointment.slotTime}</span></p>
                            <p>{currency}{item.appointment.amount}</p>
                            {
                                item.appointment.cancelled
                                    ?<div className='flex items-center gap-2'>
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
                                            <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                            <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                        </div>
                            }

                        </div>
                    ))
                }

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

export default DoctorAppointments