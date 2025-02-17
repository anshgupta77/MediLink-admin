import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const Login = () => {

  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);


  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (state === "Admin") {

        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);  
          navigate("/");
        } else {
          toast.error(data.message);
        }

      }
      else {

        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          navigate("/doctor-dashboard");
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'> {state} </span> Login </p>
        <div className='w-full'>
          <p>Email:</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password:</p>
          <div className='relative'>
              <input value={password} type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' required />
              <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
        <div className="flex items-center justify-center gap-2">
            {loading && <Loader2 className="text-white animate-spin" />}
            Login
          </div>
          </button>
        {
          state === "Admin" ?
            <p>For login as Doctor? <span className='text-primary hover:underline cursor-pointer' onClick={() => setState("Doctor")}>Click here</span></p> :
            <p>For login as Admin? <span className='text-primary hover:underline cursor-pointer' onClick={() => setState("Admin")}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login