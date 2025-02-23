
// import React, { useContext, useEffect } from 'react';
// import { AdminContext } from '../../context/AdminContext';
// import { AppContext } from '../../context/AppContext';
// import LoadingOverlay from '../../components/LoadingOverlay';

// const AllAppointments = () => {
//   const { aToken, appointments, getAllAppointments, loadingGetAllAppointments } = useContext(AdminContext);
//   const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);

//   if (loadingGetAllAppointments) {
//     return <LoadingOverlay />;
//   }

//   return (
//     <div className='w-full  bg-[#130e3d] text-[#d3bccc] p-6 shadow-lg border border-white/10'>
//       <p className='mb-3 text-lg font-medium bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100'>All Appointments</p>

//       <div className='bg-white/10 border border-white/20 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll backdrop-blur-sm'>
//         <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-white/20 text-white/80'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>

//         {appointments.map((item, index) => (
//           <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] items-center text-[#d3bccc] py-3 px-6 border-b border-white/20 hover:bg-white/10 transition-all duration-300' key={index}>
//             <p className='max-sm:hidden'>{index + 1}</p>
//             <div className='flex items-center gap-2'>
//               <img className='w-8 rounded-full border border-white/30' src={item.userData.image} alt='' />
//               <p>{item.userData.name}</p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
//             <div className='flex items-center gap-2'>
//               <img className='w-8 rounded-full border border-white/30' src={item.docData.image} alt='' />
//               <p>{item.docData.name}</p>
//             </div>
//             <p>{currency}{item.amount}</p>
//             {item.cancelled
//               ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//               : item.isCompleted
//                 ? <p className='text-green-400 text-xs font-medium'>Completed</p>
//                 : <p className='text-gray-300 text-xs font-medium'>Pending</p>
//             }
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;






// import React, { useContext, useEffect } from 'react';
// import { AdminContext } from '../../context/AdminContext';
// import { AppContext } from '../../context/AppContext';
// import LoadingOverlay from '../../components/LoadingOverlay';

// const AllAppointments = () => {
//   const { aToken, appointments, getAllAppointments, loadingGetAllAppointments } = useContext(AdminContext);
//   const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);

//   if (loadingGetAllAppointments) {
//     return <LoadingOverlay />;
//   }

//   const getStatusClass = (status) => {
//     if (status === 'Cancelled') return 'text-red-400';
//     if (status === 'Completed') return 'text-green-400';
//     return 'text-gray-300';
//   };

//   return (
//     <div className='w-full bg-[#130e3d] text-[#d3bccc] p-3 md:p-6 shadow-lg border border-white/10'>
//       <p className='mb-3 text-base md:text-lg font-medium bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100'>
//         All Appointments
//       </p>

//       <div className='bg-white/10 border border-white/20 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto backdrop-blur-sm'>
//         {/* Desktop Headers */}
//         <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] py-3 px-4 md:px-6 border-b border-white/20 text-white/80'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Status</p>
//         </div>

//         {/* Appointment Cards */}
//         {appointments.map((item, index) => (
//           <div 
//             key={index}
//             className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] p-4 md:px-6 border-b border-white/20 hover:bg-white/10 transition-all duration-300'
//           >
//             {/* Mobile View Header */}
//             <div className='flex justify-between items-center sm:hidden mb-4'>
//               <div className='flex items-center gap-2'>
//                 <img 
//                   className='w-10 h-10 rounded-full border border-white/30' 
//                   src={item.userData.image} 
//                   alt={item.userData.name} 
//                 />
//                 <div>
//                   <p className='font-medium'>{item.userData.name}</p>
//                   <p className='text-xs opacity-70'>{calculateAge(item.userData.dob)} years</p>
//                 </div>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
//                 item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'
//               )}`}>
//                 {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'}
//               </span>
//             </div>

//             {/* Desktop View Content */}
//             <p className='max-sm:hidden'>{index + 1}</p>
            
//             <div className='max-sm:hidden flex items-center gap-2'>
//               <img className='w-8 rounded-full border border-white/30' src={item.userData.image} alt='' />
//               <p>{item.userData.name}</p>
//             </div>
            
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

//             {/* Mobile & Desktop Content */}
//             <div className='mb-3 sm:mb-0'>
//               <p className='sm:hidden text-xs opacity-70 mb-1'>Date & Time:</p>
//               <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
//             </div>

//             {/* <div className='flex justify-between'> */}
//                 <div className='mb-3 sm:mb-0'>
//                   <p className='sm:hidden text-xs opacity-70 mb-1'>Doctor:</p>
//                   <div className='flex items-center gap-2'>
//                     <img className='w-8 h-8 rounded-full border border-white/30' src={item.docData.image} alt='' />
//                     <p>{item.docData.name}</p>
//                   </div>
//                 </div>

//                 <div className='mb-3 sm:mb-0'>
//                   <p className='sm:hidden text-xs opacity-70 mb-1'>Fees:</p>
//                   <p>{currency}{item.amount}</p>
//                 </div>
//             {/* </div> */}


//             <div className='max-sm:hidden'>
//               {item.cancelled ? (
//                 <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//               ) : item.isCompleted ? (
//                 <p className='text-green-400 text-xs font-medium'>Completed</p>
//               ) : (
//                 <p className='text-gray-300 text-xs font-medium'>Pending</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;










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

  const getStatusClass = (status) => {
    if (status === 'Cancelled') return 'text-red-400';
    if (status === 'Completed') return 'text-green-400';
    return 'text-gray-300';
  };

  return (
    <div className='w-full bg-[#130e3d] text-[#d3bccc] p-3 md:p-6 shadow-lg border border-white/10'>
      <p className='mb-3 text-base md:text-lg font-medium bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100'>
        All Appointments
      </p>

      <div className='bg-white/10 border border-white/20 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto backdrop-blur-sm'>
        {/* Desktop Headers */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] py-3 px-4 md:px-6 border-b border-white/20 text-white/80'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {/* Appointment Cards */}
        {appointments.map((item, index) => (
          <div 
            key={index}
            className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] p-4 md:px-6 border-b border-white/20 hover:bg-white/10 transition-all duration-300'
          >
            {/* Mobile View Header */}
            <div className='flex justify-between items-center sm:hidden mb-4'>
              <div className='flex items-center gap-2'>
                <img 
                  className='w-10 h-10 rounded-full border border-white/30' 
                  src={item.userData.image} 
                  alt={item.userData.name} 
                />
                <div>
                  <p className='font-medium'>{item.userData.name}</p>
                  <p className='text-xs opacity-70'>{calculateAge(item.userData.dob)} years</p>
                </div>
              </div>
              <span className={` py-1 rounded-full text-xs font-medium ${getStatusClass(
                item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'
              )}`}>
                {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'}
              </span>
            </div>

            {/* Desktop View Content */}
            <p className='max-sm:hidden'>{index + 1}</p>
            
            <div className='max-sm:hidden flex items-center gap-2'>
              <img className='w-8 rounded-full border border-white/30' src={item.userData.image} alt='' />
              <p>{item.userData.name}</p>
            </div>
            
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>


            {/* Doctor and Fees Container for Mobile */}
            <div className='sm:hidden flex justify-between items-center mb-3'>
              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full border border-white/30' src={item.docData.image} alt='' />
                <p>{item.docData.name}</p>
              </div>
              <div>
                <p className='text-right'>{currency}{item.amount}</p>
              </div>
            </div>

            {/* Mobile & Desktop Content */}
                <div className='mb-3 sm:mb-0'>
                  <p className='sm:hidden text-xs opacity-70 mb-1'>Date & Time:</p>
                  <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
                </div>

                
            {/* Desktop Doctor Info */}
            <div className='max-sm:hidden mb-3 sm:mb-0'>
              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full border border-white/30' src={item.docData.image} alt='' />
                <p>{item.docData.name}</p>
              </div>
            </div>

            {/* Desktop Fees */}
            <div className='max-sm:hidden mb-3 sm:mb-0'>
              <p>{currency}{item.amount}</p>
            </div>

            <div className='max-sm:hidden'>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-400 text-xs font-medium'>Completed</p>
              ) : (
                <p className='text-gray-300 text-xs font-medium'>Pending</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;