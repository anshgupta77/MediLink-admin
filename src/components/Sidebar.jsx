

import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { DoctorContext } from '../context/DoctorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendarCheck, faUserDoctor, faUsers } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return (
        <div className="min-h-screen bg-[#130e3d] border-r border-white/10">
            {aToken && (
                <ul className="mt-5 space-y-1 px-3">
                    <NavLink 
                        to="/admin-dashboard"
                        className={({ isActive }) => `
                            flex items-center gap-3 py-3.5 px-4 md:px-6 md:min-w-72
                            rounded-lg transition-all duration-300 group
                            ${isActive 
                                ? "bg-white/10 text-white border-r-4 border-purple-500" 
                                : "text-[#d3bccc] hover:bg-white/5 hover:text-white"
                            }
                        `}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            {/* <img 
                                src={assets.home_icon} 
                                alt="" 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 " 
                            /> */}

                            <FontAwesomeIcon icon={faHouse} className="text-[#d3bccc] w-5 h-5" />
                        </div>
                        <p className="hidden md:block text-sm">Dashboard</p>
                    </NavLink>

                    <NavLink 
                        to="/all-appointments"
                        className={({ isActive }) => `
                            flex items-center gap-3 py-3.5 px-4 md:px-6 md:min-w-72
                            rounded-lg transition-all duration-300 group
                            ${isActive 
                                ? "bg-white/10 text-white border-r-4 border-purple-500" 
                                : "text-[#d3bccc] hover:bg-white/5 hover:text-white"
                            }
                        `}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            {/* <img 
                                src={assets.appointment_icon} 
                                alt="" 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 text-[#d3bccc]" 
                            /> */}
                            <FontAwesomeIcon icon={faCalendarCheck} className="text-[#d3bccc] w-5 h-5" />
                        </div>
                        <p className="hidden md:block text-sm">Appointments</p>
                    </NavLink>

                    <NavLink 
                        to="/all-doctors"
                        className={({ isActive }) => `
                            flex items-center gap-3 py-3.5 px-4 md:px-6 md:min-w-72
                            rounded-lg transition-all duration-300 group
                            ${isActive 
                                ? "bg-white/10 text-white border-r-4 border-purple-500" 
                                : "text-[#d3bccc] hover:bg-white/5 hover:text-white"
                            }
                        `}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            {/* <img 
                                src={assets.add_icon} 
                                alt="" 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 text-[#d3bccc]" 
                            /> */}
                           <FontAwesomeIcon icon={faUserDoctor} className="text-[#d3bccc] w-5 h-5" /> 
                        </div>
                        <p className="hidden md:block text-sm">Add Doctors</p>
                    </NavLink>

                    <NavLink 
                        to="/doctor-list"
                        className={({ isActive }) => `
                            flex items-center gap-3 py-3.5 px-4 md:px-6 md:min-w-72
                            rounded-lg transition-all duration-300 group
                            ${isActive 
                                ? "bg-white/10 text-white border-r-4 border-purple-500" 
                                : "text-[#d3bccc] hover:bg-white/5 hover:text-white"
                            }
                        `}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            {/* <img 
                                src={assets.people_icon} 
                                alt="" 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 text-[#d3bccc]" 
                            /> */}

                            <FontAwesomeIcon icon={faUsers} className="text-[#d3bccc] w-5 h-5" />
                        </div>
                        <p className="hidden md:block text-sm">Doctors List</p>
                    </NavLink>
                </ul>
            )}

            {dToken && (
                <ul className="mt-5 space-y-1 px-3">
                    <NavLink 
                        to="/doctor-dashboard"
                        className={({ isActive }) => `
                            flex items-center gap-3 py-3.5 px-4 md:px-6 md:min-w-72
                            rounded-lg transition-all duration-300 group
                            ${isActive 
                                ? "bg-white/10 text-white border-r-4 border-purple-500" 
                                : "text-[#d3bccc] hover:bg-white/5 hover:text-white"
                            }
                        `}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            {/* <img 
                                src={assets.home_icon} 
                                alt="" 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 text-[#d3bccc]" 
                            /> */}

                            <FontAwesomeIcon icon={faHouse} className="text-[#d3bccc] w-5 h-5" />
                        </div>
                        <p className="hidden md:block text-sm">Dashboard</p>
                    </NavLink>

                    <NavLink 
                        to="/doctor-appointments"
                        className={({ isActive }) => `
                            flex items-center gap-3 py-3.5 px-4 md:px-6 md:min-w-72
                            rounded-lg transition-all duration-300 group
                            ${isActive 
                                ? "bg-white/10 text-white border-r-4 border-purple-500" 
                                : "text-[#d3bccc] hover:bg-white/5 hover:text-white"
                            }
                        `}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            {/* <img 
                                src={assets.appointment_icon} 
                                alt="" 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 text-[#d3bccc]" 
                            /> */}
                            <FontAwesomeIcon icon={faCalendarCheck} className="text-[#d3bccc] w-5 h-5" />
                        </div>
                        <p className="hidden md:block text-sm">Appointments</p>
                    </NavLink>

                    <NavLink 
                        to="/doctor-profile"
                        className={({ isActive }) => `
                            flex items-center gap-3 py-3.5 px-4 md:px-6 md:min-w-72
                            rounded-lg transition-all duration-300 group
                            ${isActive 
                                ? "bg-white/10 text-white border-r-4 border-purple-500" 
                                : "text-[#d3bccc] hover:bg-white/5 hover:text-white"
                            }
                        `}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            {/* <img 
                                src={assets.people_icon} 
                                alt="" 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 text-[#d3bccc]" 
                            /> */}

                            <FontAwesomeIcon icon={faUsers} className="text-[#d3bccc] w-5 h-5" /> 
                        </div>
                        <p className="hidden md:block text-sm">Profile</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;




