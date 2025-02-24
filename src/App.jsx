import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctors from './pages/Admin/AddDoctor';
import DoctorsLisr from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

import { DoctorAuth, AdminAuth } from './auth';

const App = () => {
  function Layout(component){
    return (
      <>
        <div className='bg-[#130e3d]'>
          <ToastContainer />
          <Navbar />
          <div className='flex items-star'>
            <Sidebar />
            {component}
          </div>
        </div>
      </>
    )
  }

  function LoginLayout(component){
    return (
      <>
        <ToastContainer />
        {component}
      </>
    )
  }

  return (
        <Routes>
          {/* Admin Route */}
          <Route element={<AdminAuth />} >
              <Route path="/admin-dashboard" element={Layout(<Dashboard />)} />
              <Route path="/all-appointments" element={Layout(<AllAppointments />)} />
              <Route path="/all-doctors" element={Layout(<AddDoctors />)} />
              <Route path="/doctor-list" element={Layout(<DoctorsLisr />)} />
          </Route>

          {/* Doctor Route */}
          <Route element={<DoctorAuth />} >
              <Route path="/doctor-dashboard" element={Layout(<DoctorDashboard />)} />
              <Route path="/doctor-appointments" element={Layout(<DoctorAppointments />)} />
              <Route path="/doctor-profile" element={Layout(<DoctorProfile />)} />
          </Route>

          <Route path="/" element={LoginLayout(<Login />)} />
        </Routes>

  )
}

export default App