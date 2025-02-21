// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import LoadingOverlay from '../../components/LoadingOverlay';

// const DoctorsList = () => {

//   const { doctors, aToken, getAllDoctors, changeAvailability, loadingGetAllDoctors } = useContext(AdminContext);
 
//   useEffect(() => {
//     if (aToken) {
//       getAllDoctors();
//     }
//   }, [aToken]);

//   if (loadingGetAllDoctors) {
//     return (
//       <LoadingOverlay />
//     )
//   }

//   return (
//     <div className='w-full max-w-6xl m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium'>All Doctors</h1>

//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {doctors && doctors.map((item, index) => (
          
//           <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//             {console.log(item.available)}
//             <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt={item.name} />
//             <div className='p-4'>
//               <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
//               <p className='text-zinc-600 text-sm'>{item.speciality}</p>
//               <div className='mt-2 flex items-center gap-1 text-sm'>
//                 <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
//                 <p>Available</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DoctorsList




import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import LoadingOverlay from '../../components/LoadingOverlay';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, loadingGetAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  if (loadingGetAllDoctors) {
    return <LoadingOverlay />;
  }

  return (
    <div className='w-full bg-[#130e3d] text-[#d3bccc] p-6 shadow-lg border border-white/10'>
      <h1 className='mb-3 text-lg font-medium bg-clip-text text-[#D3BCCC] bg-gradient-to-r from-white to-purple-100'>All Doctors</h1>

      <div className=' rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll backdrop-blur-sm p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {doctors && doctors.map((item, index) => (
          <div className='border border-white/20 rounded-xl overflow-hidden cursor-pointer group bg-[#1a1642] hover:bg-white/10 transition-all duration-300 p-4' key={index}>
            <img className='w-full rounded-t-xl border-b border-white/20' src={item.image} alt={item.name} />
            <div className='p-4'>
              <p className='text-[#d3bccc] text-lg font-medium'>{item.name}</p>
              <p className='text-gray-400 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm text-gray-300'>
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} className='accent-purple-400' />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
