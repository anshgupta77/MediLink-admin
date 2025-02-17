import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : false);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const [loadingGetAppointments, setLoadingGetAppointments] = useState(true);
  const [loadingGetDashData, setLoadingGetDashData] = useState(true);
  const [loadingGetProfileData, setLoadingGetProfileData] = useState(true);
  const [loadingCompleteAppointment, setLoadingCompleteAppointment] = useState(false);
  const [loadingCancelAppointment, setLoadingCancelAppointment] = useState(false);

  const getAppointments = async () => {
    setLoadingGetAppointments(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dToken } });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingGetAppointments(false);
    }
  }

  const completeAppointment = async (appointmentId) => {
    setLoadingCompleteAppointment(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/completed-appointment`, { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingCompleteAppointment(false);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    setLoadingCancelAppointment(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingCancelAppointment(false);
    }
  }

  const getDashData = async () => {
    setLoadingGetDashData(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dToken } });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData)
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingGetDashData(false);
    }
  }

  const getProfileData = async () => {
    setLoadingGetProfileData(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { dToken } });
      if (data.success) {
        setProfileData(data.profileData);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingGetProfileData(false);
    }
  }


  const value = {
    dToken, setDToken,
    backendUrl,
    appointments, setAppointments,
    getAppointments,
    completeAppointment, cancelAppointment,
    dashData, setDashData,
    getDashData,
    profileData, setProfileData,
    getProfileData,
    loadingGetAppointments,
    loadingGetDashData,
    loadingGetProfileData,
    loadingCompleteAppointment,
    loadingCancelAppointment
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;