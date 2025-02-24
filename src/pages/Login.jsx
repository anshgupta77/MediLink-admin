
import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const aToken = localStorage.getItem("aToken");
  const dToken = localStorage.getItem("dToken");

  if(aToken){
    localStorage.removeItem("aToken");
  }
  if(dToken){
    localStorage.removeItem("dToken");
  }
  
  console.log(backendUrl);
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
          navigate("/admin-dashboard");
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

  const inputStyle = "w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-[#d3bccc] placeholder-[#d3bccc]/50 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
  const labelStyle = "text-[#d3bccc]/70 font-medium"

  return (
    <div className="min-h-screen bg-[#130e3d] flex items-center justify-center p-4">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md">
        <div className="bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
              {state} Login
            </h1>
            <p className="mt-2 text-[#d3bccc]/70">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className={labelStyle}>
              Email Address
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputStyle} mt-2`}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className={labelStyle}>
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyle}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#d3bccc]/70 hover:text-[#d3bccc] transition-colors duration-300"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full bg-purple-600 border border-white/20 rounded-lg py-3 text-white font-medium hover:bg-purple-700 transition-all duration-300 relative"
            disabled={loading}
          >
            <div className="flex items-center justify-center gap-2">
              {loading && <Loader2 className="animate-spin" />}
              {loading ? 'Logging in...' : 'Login'}
            </div>
          </button>

          {/* Toggle State */}
          <div className="mt-6 text-center text-[#d3bccc]">
            {state === "Admin" ? (
              <p>
                Login as Doctor?{" "}
                <button
                  type="button"
                  onClick={() => setState("Doctor")}
                  className="text-purple-400 ml-1 hover:text-purple-500 transition-colors duration-300 font-medium"
                >
                  Switch to Doctor Login
                </button>
              </p>
            ) : (
              <p>
                Login as Admin?{" "}
                <button
                  type="button"
                  onClick={() => setState("Admin")}
                  className="text-purple-400 hover:text-purple-500 ml-1 transition-colors duration-300 font-medium"
                >
                  Switch to Admin Login
                </button>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;