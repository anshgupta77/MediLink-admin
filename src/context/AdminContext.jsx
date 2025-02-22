import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../constraints";
// Create the context
export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : false);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [loadingGetDeshData, setLoadingGetDeshData] = useState(true);
    const [loadingGetAllDoctors, setLoadingGetAllDoctors] = useState(true);
    const [loadingGetAllAppointments, setLoadingGetAllAppointments] = useState(false);
    const [loadingCancelAppointment, setLoadingCancelAppointment] = useState(false);
    const [loadingChangeAvailability, setLoadingChangeAvailability] = useState(false);

    // Access the environment variable from Vite
    

    console.log("Admin Context", backendUrl);


    const getAllDoctors = async () => {
        setLoadingGetAllDoctors(true);
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { headers: { aToken } });
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoadingGetAllDoctors(false);
        }
    }

    const changeAvailability = async (docId) => {
        setLoadingChangeAvailability(true);
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoadingChangeAvailability(false);
        }

    }

    const getAllAppointments = async () => {
        setLoadingGetAllAppointments(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { aToken } });
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoadingGetAllAppointments(false);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        }
        catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const getDeshData = async () => {
        setLoadingGetDeshData(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { aToken } });
            if (data.success) {
                setDashData(data.dashData);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingGetDeshData(false);
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl,
        doctors, getAllDoctors,
        changeAvailability,
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData, getDeshData,
        loadingGetDeshData,
        loadingGetAllDoctors,
        loadingGetAllAppointments,
        loadingCancelAppointment
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
