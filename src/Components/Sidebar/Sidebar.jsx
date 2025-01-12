import React, { useEffect, useState } from 'react'
import prog from "../../assets/prog.jpg"
import { Link } from 'react-router-dom';

export default function Sidebar({ isSidebarVisible, setSidebarVisible, toggleSidebar }) {
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1300 && isSidebarVisible) {
                setSidebarVisible(false);
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isSidebarVisible]);


    return <>

        <div className={`sidebar fixed top-0 z-20 left-0 bottom-0 h-full md:w-[320px] w-full flex flex-col  bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5 transition-transform duration-300 ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"
            }`}>
            <div className="side-data absolute inset-0 bg-black/10" >
                <button
                    onClick={toggleSidebar}
                    className="toggle absolute z-30 top-1/2 rounded-r-lg p-3 -right-10 "
                >
                    <i className="fa-solid text-xl text-black fa-arrow-right"></i>
                </button>
                <button
                    onClick={toggleSidebar}
                    className="toggle absolute z-30 top-3 md:hidden blo  rounded-lg p-3 right-0 "
                >
                    <i className="fa-solid text-xl text-black fa-arrow-left"></i>

                </button>

                <div className="p-4 mb-2">
                    <div className="admin-info flex flex-col items-center">
                        <img src={prog} className='w-28 h-28 rounded-full' alt="" />
                        <p className='comfort mt-2'>Eng/ Mohamed Abo Saif</p>
                        <p className='font-medium text-sky-900'> Super Admin</p>
                    </div>

                </div>
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">


                    <hr className="my-2 border-blue-gray-50" />
                    <Link to={""}>
                        <div onClick={toggleSidebar} role="button"
                            className="flex bg-slate-50/50 hover:bg-slate-100 items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <div className="grid mr-4 place-items-center">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            Users
                            <div className="grid ml-auto place-items-center justify-self-end">

                            </div>
                        </div>
                    </Link>
                    <Link to={"properties"}>
                        <div onClick={toggleSidebar} role="button"
                            className="flex bg-slate-50/50 hover:bg-slate-100 items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <div className="grid mr-4 place-items-center">
                                <i className="fa-solid fa-building-wheat"></i>
                            </div>
                            Properties
                        </div>
                    </Link>
                    <Link to={"bookings"}>
                        <div onClick={toggleSidebar} role="button"
                            className="flex bg-slate-50/50 hover:bg-slate-100 items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <div className="grid mr-4 place-items-center">
                                <i className="fa-solid fa-bookmark"></i>
                            </div>
                            Bookings
                        </div>
                    </Link>
                </nav>
            </div>

        </div>

    </>
}
