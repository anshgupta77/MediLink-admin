
import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import LoadingOverlay from '../../components/LoadingOverlay';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, loadingGetAllAppointments } = useContext(AdminContext);
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  if (loadingGetAllAppointments) {
    return <LoadingOverlay />;
  }

  return (
    <div className='w-full  bg-[#130e3d] text-[#d3bccc] p-6 shadow-lg border border-white/10'>
      <p className='mb-3 text-lg font-medium bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100'>All Appointments</p>

      <div className='bg-white/10 border border-white/20 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll backdrop-blur-sm'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-white/20 text-white/80'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] items-center text-[#d3bccc] py-3 px-6 border-b border-white/20 hover:bg-white/10 transition-all duration-300' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full border border-white/30' src={item.userData.image} alt='' />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full border border-white/30' src={item.docData.image} alt='' />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                : <p className='text-gray-300 text-xs font-medium'>Pending</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;








