
import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from '../../components/LoadingOverlay';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl, loadingGetProfileData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (loadingGetProfileData) {
    return <LoadingOverlay />;
  }

  return (
    profileData && (
      <div className='w-full bg-[#130e3d] text-[#d3bccc] p-6 shadow-lg border border-white/10'>
        <div className='flex flex-col gap-4 m-5'>
          <div>
            <img className='w-full sm:max-w-64 rounded-lg border border-white/20' src={profileData.image} alt='' />
          </div>
          <div className='flex-1 border border-white/20 rounded-lg p-8 py-7 bg-white/10 backdrop-blur-sm'>
            <p className='flex items-center gap-2 text-3xl font-medium text-[#D3BCCC]'>{profileData.name}</p>
            <div className='flex items-center gap-2 mt-1 text-[#D3BCCC]'>
              <p>{profileData.degree} - {profileData.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
            </div>
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-white/80 mt-3'>About:</p>
              <p className='text-sm text-[#D3BCCC] max-w-[700px] mt-1'>{profileData.about}</p>
            </div>
            <p className='text-white font-medium mt-4'>
              Appointment fee: <span className='text-[#D3BCCC]'>
                {currency}{' '}
                {isEdit ? (
                  <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} className='bg-transparent border border-white/30 px-2 py-1 rounded' />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className='flex gap-2 py-2'>
              <p className='text-white/80'>Address</p>
              <p className='text-sm text-[#D3BCCC]'>
                {isEdit ? (
                  <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} className='bg-transparent border border-white/30 px-2 py-1 rounded' />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} className='bg-transparent border border-white/30 px-2 py-1 rounded' />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className='flex gap-1 pt-2'>
              <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type='checkbox' className='accent-white' />
              <label htmlFor='' className='text-white/80'>Available</label>
            </div>
            {isEdit ? (
              <button onClick={updateProfile} className='px-4 py-1 border border-[#D3BCCC] text-sm rounded-full mt-5 hover:bg-[#D3BCCC] hover:text-[#130e3d] transition-all'>Save</button>
            ) : (
              <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-[#D3BCCC] text-sm rounded-full mt-5 hover:bg-[#D3BCCC] hover:text-[#130e3d] transition-all'>Edit</button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;