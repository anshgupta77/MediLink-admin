// import React, { useContext, useEffect, useState } from 'react'
// import { DoctorContext } from '../../context/DoctorContext';
// import { AppContext } from '../../context/AppContext';
// import { assets } from '../../assets/assets_admin/assets';
// import LoadingOverlay from '../../components/LoadingOverlay';
// import RemoveConfirmation from '../../components/RemoveConfirm';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// const DoctorAppointments = () => {

//     const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment , loadingGetAppointments, loadingCompleteAppointment, loadingCancelAppointment } = useContext(DoctorContext);
//     console.log(dToken);
//     const [showRemoveModal, setShowRemoveModal] = useState(false);
//     const [selectedAppointment, setSelectedAppointment] = useState(null);
//     const { calculateAge, slotDateFormate, currency } = useContext(AppContext);
//     const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";


    

//     const handleRemoveClick = (appointment) => {
//         setSelectedAppointment(appointment);
//         setShowRemoveModal(true);
//       }



//       const handleConfirmDelete = async (appointmentId) => {
//         try {
//           const { data } = await axios.post(`${backendUrl}/api/doctor/remove-appointment`, { appointmentId }, { headers: { dToken } });
//           if (data.success) {
//             toast.success(data.message);
//             getAppointments();
//           } else {
//             toast.error(data.message);
//           }
//         } catch (error) {
//           console.error(error);
//           toast.error(error.response.data.message || "Something went wrong");
//         }
    
//       }
//     useEffect(() => {
//         if (dToken) {
//             getAppointments();
//         }
//     }, [dToken]);

    
//     if(loadingGetAppointments || loadingCompleteAppointment || loadingCancelAppointment){
//         return (
//             <LoadingOverlay/>
//         )
//     }
    
//     return (
//         <div className='w-full max-w-6xl m-5'>
//             <p className='mb-3 text-lg font-medium'>All Appointments</p>

//             <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>

//                 <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//                     <p>#</p>
//                     <p>Patient</p>
//                     <p>Payment</p>
//                     <p>Age</p>
//                     <p>Date & Time</p>
//                     <p>Fees</p>
//                     <p>Action</p>
//                 </div>

//                 {
//                     appointments.reverse().map((item, index) => (
//                         <div className='flex flex-wrap justify-between max-sm:gap-2 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//                             <p className='max-sm:hidden'>{index + 1}</p>
//                             <div className='flex items-center gap-2'>
//                                 <img className='w-8 rounded-full' src={item.appointment.userData.image} alt="" />
//                                 <p>{item.appointment.userData.name}</p>
//                             </div>
//                             <div>
//                                 <p className='text-xs inline border border-primary px-2 rounded-full'>
//                                     {item.appointment.payment ? "Online" : "Cash"}
//                                 </p>
//                             </div>
//                             {console.log(item.appointment.userData.gender)}
//                             <p className='max-sm:hidden'>{calculateAge(item.appointment.userData.dob)}</p>
//                             <p className='text-gray-600 flex gap-2'>{slotDateFormate(item.appointment.slotDate)}, <span>{item.appointment.slotTime}</span></p>
//                             <p>{currency}{item.appointment.amount}</p>
//                             {
//                                 item.appointment.cancelled
//                                     ?<div className='flex items-center gap-2'>
//                                         <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                                         <button
//                                         onClick={() => handleRemoveClick(item.appointment)} 
//                                         className=" text-red-600 hover:text-red-800 focus:outline-none"
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                     </div>
//                                     : item.appointment.isCompleted
//                                             ? <div className='flex items-center gap-2'>
//                                             <p className='text-green-500 text-xs font-medium'>Completed</p>
//                                             <button
//                                             onClick={() => handleRemoveClick(item.appointment)} 
//                                             className=" text-red-600 hover:text-red-800 focus:outline-none"
//                                         >
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                             </svg>
//                                         </button>
//                                         </div>
//                                         : <div className='flex'>
//                                             <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                                             <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                                         </div>
//                             }

//                         </div>
//                     ))
//                 }

//             </div>

//             <RemoveConfirmation
//             isOpen={showRemoveModal}
//             onClose={() => setShowRemoveModal(false)}
//             onConfirm={()=>handleConfirmDelete(selectedAppointment?._id)}
//             DeleteDataName={selectedAppointment?.userData.name}
//            />
//         </div>
//     )
// }

// export default DoctorAppointments







import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import LoadingOverlay from '../../components/LoadingOverlay';
import RemoveConfirmation from '../../components/RemoveConfirm';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment, loadingGetAppointments, loadingCompleteAppointment, loadingCancelAppointment } = useContext(DoctorContext);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  if (loadingGetAppointments || loadingCompleteAppointment || loadingCancelAppointment) {
    return <LoadingOverlay />;
  }

  return (
    <div className='w-full bg-[#130e3d] text-[#d3bccc] p-6 shadow-lg border border-white/10'>
      <p className='mb-3 text-lg font-medium bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100'>Doctor Appointments</p>
      <div className='bg-white/10 border border-white/20 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll backdrop-blur-sm'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr_1fr] py-3 px-6 border-b border-white/20 text-white/80'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Payment</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr_1fr] items-center text-[#d3bccc] py-3 px-6 border-b border-white/20 hover:bg-white/10 transition-all duration-300' key={index}>
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
              <p className='text-red-400 text-xs font-medium'>Cancelled</p>
            ) : item.appointment.isCompleted ? (
              <p className='text-green-400 text-xs font-medium'>Completed</p>
            ) : (
              <div className='flex gap-2'>
                <button onClick={() => cancelAppointment(item._id)} className='text-red-400 text-[10px] font-medium'>Cancel</button>
                <button onClick={() => completeAppointment(item._id)} className='text-green-400 text-[10px] font-medium'>Complete</button>
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